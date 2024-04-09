import { defineValaxyConfig } from 'valaxy'
import type { UserThemeConfig } from 'valaxy-theme-yun'

export default defineValaxyConfig<UserThemeConfig>({
  theme: 'yun',
  themeConfig: {
    colors: { primary: '#aacdf4' },
    banner: {
      enable: true,
      title: ['饼干的', 'Blog'],
      cloud: {
        enable: true,
      },
    },
    // @ts-ignore
    say: { enable: false },
    fireworks: { enable: false },
    pages: [],
    footer: {
      since: 2024,
      icon: { enable: false },
    },
  },
  unocss: {
    safelist: [],
  },
})
