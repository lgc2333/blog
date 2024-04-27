const { readFile, writeFile } = require('fs/promises')
const { SvgComposer, loadConfig, partitionTiers, presets } = require('sponsorkit')
const { Semaphore } = require('semaphore-promise')

/** @typedef { { name: string, avatar?: string, moneyCNY: number } } DirectSponsorRawData */

async function getDefaultAvatar() {
  const data = await readFile('public/assets/avatar-none.jpg')
  return `data:image/jpeg;base64,${data.toString('base64')}`
}

/**
 * @returns {Promise<number>}
 */
async function getExchangeRate() {
  /** @type { { rates: { USD: number }} } */
  const data = await (
    await fetch('https://api.fxratesapi.com/latest?base=CNY&currencies=USD')
  ).json()
  return data.rates.USD
}

/**
 * @param {DirectSponsorRawData[]} data
 * @returns {Promise<import('sponsorkit').Sponsorship[]>}
 */
async function transformRaw(data) {
  const defaultAvatar = await getDefaultAvatar()
  /** @type {string[]} */
  // @ts-ignore
  const avatarList = data
    .map((x) => x.avatar)
    .filter((item, pos, arr) => item && arr.indexOf(item) === pos)
  const avatarGetSem = new Semaphore(8)
  /** @type {Record<string, string>} */
  const avatars = Object.fromEntries(
    await Promise.all(
      avatarList.map(async (x) => {
        const release = await avatarGetSem.acquire()
        try {
          const resp = await fetch(x)
          const b64 = Buffer.from(await resp.arrayBuffer()).toString('base64')
          return [x, `data:${resp.headers.get('Content-Type')};base64,${b64}`]
        } finally {
          release()
        }
      }),
    ),
  )

  const exchangeRate = await getExchangeRate()
  /** @type {import('sponsorkit').Sponsorship[]} */
  const sponsors = data.map((x) => ({
    sponsor: {
      type: 'User',
      login: '',
      name: x.name,
      avatarUrl: x.avatar ? avatars[x.avatar] : defaultAvatar,
    },
    monthlyDollars: x.moneyCNY * exchangeRate,
  }))
  return sponsors
}

/**
 * from sponsorkit
 *
 * @param {SvgComposer} composer
 * @param {import('sponsorkit').Sponsorship[]} sponsors
 * @param {import('sponsorkit').SponsorkitConfig} config
 */
async function defaultComposer(composer, sponsors, config) {
  const tierPartitions = partitionTiers(
    sponsors,
    // @ts-ignore
    config.tiers,
    config.includePastSponsors,
  )

  composer.addSpan(config.padding?.top ?? 20)

  tierPartitions.forEach(({ tier: t, sponsors }) => {
    t.composeBefore?.(composer, sponsors, config)
    if (t.compose) {
      t.compose(composer, sponsors, config)
    } else {
      const preset = t.preset || presets.base
      if (sponsors.length && preset.avatar.size) {
        const paddingTop = t.padding?.top ?? 20
        const paddingBottom = t.padding?.bottom ?? 10
        if (paddingTop) composer.addSpan(paddingTop)
        if (t.title) {
          composer.addTitle(t.title).addSpan(5)
        }
        composer.addSponsorGrid(sponsors, preset)
        if (paddingBottom) composer.addSpan(paddingBottom)
      }
    }
    t.composeAfter?.(composer, sponsors, config)
  })

  composer.addSpan(config.padding?.bottom ?? 20)
}

;(async () => {
  console.log('Start Composing Direct Sponsors SVG...')

  /** @type {DirectSponsorRawData[]} */
  const sponsorsRaw = JSON.parse(await readFile('public/sponsors/direct-raw.json', 'utf-8'))
  const sponsorsRawSorted = sponsorsRaw.sort((a, b) => b.moneyCNY - a.moneyCNY)
  const sponsors = await transformRaw(sponsorsRawSorted)
  const config = await loadConfig()
  const composer = new SvgComposer(config)
  await defaultComposer(composer, sponsors, config)
  const svg = composer.generateSvg().replaceAll('<image ', '<image clip-path="inset(0 round 50%)" ')
  await writeFile('public/sponsors/direct.svg', svg, { encoding: 'utf-8' })

  console.log('Compose Direct Sponsors SVG Done')
})()
