const { readFileSync, writeFileSync } = require('fs')
const { SvgComposer, loadConfig, partitionTiers, presets } = require('sponsorkit')

/**
 * @param {SvgComposer} composer
 * @param {import('sponsorkit').Sponsorship[]} sponsors
 * @param {import('sponsorkit').SponsorkitConfig} config
 */
async function defaultComposer(composer, sponsors, config) {
  const tierPartitions = partitionTiers(
    sponsors,
    // @ts-ignore
    config.tiers,
    config.includePastSponsors
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

/**
 * @param {import('sponsorkit').Sponsorship[]} sponsors
 * @returns {Promise<import('sponsorkit').Sponsorship[]>}
 */
async function resolveAvatarUrls(sponsors) {
  return Promise.all(
    sponsors.map(async (sponsor) => {
      sponsor.sponsor.avatarUrl =
        'data:image;base64,' +
        Buffer.from(await (await fetch(sponsor.sponsor.avatarUrl)).arrayBuffer()).toString('base64')
      return sponsor
    })
  )
}

;(async () => {
  const sponsors = await resolveAvatarUrls(
    JSON.parse(readFileSync('scripts/sponsor-direct.json', { encoding: 'utf-8' }))
  )
  const config = await loadConfig()
  const composer = new SvgComposer(config)
  await defaultComposer(composer, sponsors, config)
  const svg = composer.generateSvg().replaceAll('<image ', '<image clip-path="inset(0 round 50%)" ')
  writeFileSync('public/assets/sponsors-direct.svg', svg, { encoding: 'utf-8' })
})()
