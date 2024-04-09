import { defineValaxyConfig } from 'valaxy'
import { addonComponents } from 'valaxy-addon-components'

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
    pages: [
      {
        name: '友链',
        url: '/links',
        icon: 'i-ri-link',
        color: 'var(--va-c-text)',
      },
      {
        name: '赞助',
        url: '/donate',
        icon: 'i-ri-heart-2-line',
        color: 'var(--va-c-text)',
      },
    ],
    notice: {
      enable: false,
      content: '',
    },
    footer: {
      since: 2024,
      icon: { enable: false },
    },
  },
  addons: [addonComponents()],
  unocss: {
    safelist: [],
  },
})
