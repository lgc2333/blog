import { readFile } from 'fs/promises'

import { defineConfig, tierPresets } from 'sponsorkit'

/**
 * @typedef {Object} DirectSponsorRawData
 * @property {string} name
 * @property {string} [username]
 * @property {string} [avatar]
 * @property {number} moneyCNY
 * @property {string} [url]
 */

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

/** @type {import('sponsorkit').Provider} */
const directProvider = {
  name: 'direct',
  async fetchSponsors() {
    /** @type {DirectSponsorRawData[]} */
    const rawSponsors = JSON.parse(
      await readFile('public/sponsors/direct-raw.json', { encoding: 'utf-8' }),
    )
    const exchangeRate = await getExchangeRate()

    /** @type {import('sponsorkit').Sponsorship[]} */
    const sponsors = rawSponsors.map((x) => ({
      sponsor: {
        type: 'User',
        login: x.username ?? x.name,
        name: x.name,
        avatarUrl: x.avatar || '',
        linkUrl: x.url,
      },
      monthlyDollars: x.moneyCNY * exchangeRate,
      provider: this.name,
      raw: x,
    }))
    return sponsors
  },
}

export default defineConfig({
  providers: ['afdian', directProvider],
  formats: ['svg'],
  cacheFile: '../../.sponsorkit/.cache.json',
  outputDir: './public/sponsors',
  includePastSponsors: true,
  fallbackAvatar: await readFile('public/assets/avatar-none.jpg'),
  tiers: [{ preset: tierPresets.large }],
  renders: [
    {
      name: 'afdian',
      filter: (x) => x.provider === 'afdian',
    },
    {
      name: 'direct',
      filter: (x) => x.provider === 'direct',
    },
  ],
})
