import { defineConfig, presets } from 'sponsorkit'

export default defineConfig({
  providers: ['afdian'],
  formats: ['svg'],
  outputDir: '.sponsorkit',
  name: '../public/sponsors/afdian',
  tiers: [
    {
      title: 'Sponsors',
      preset: presets.large,
    },
    {
      title: 'Past Sponsors',
      monthlyDollars: -1,
      preset: presets.large,
    },
  ],
})
