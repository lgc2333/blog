import { defineSiteConfig } from 'valaxy'

export default defineSiteConfig({
  url: 'https://blog.lgc2333.top/',
  title: '饼干的 Blog',
  subtitle: '',
  description: '',
  author: {
    name: 'student_2333',
    email: 'lgc2333@126.com',
    // link: 'https://lgc2333.top/',
    avatar: '/assets/favicon.png',
    status: {
      emoji: '❤️',
      message: '单恋中',
    },
  },

  lang: 'zh-CN',
  languages: ['zh-CN'],
  mode: 'auto',
  timezone: 'Asia/Shanghai',
  lastUpdated: true,
  favicon: '/assets/favicon.png',
  feed: { name: 'feed.xml', favicon: '/assets/favicon.png' },
  search: { enable: true, type: 'fuse' },
  license: { enabled: true, type: 'by-nc' },
  mediumZoom: { enable: true },

  social: [
    {
      name: 'RSS',
      link: '/feed.xml',
      icon: 'i-ri-rss-line',
      color: 'orange',
    },
    {
      name: '主页',
      link: 'https://lgc2333.top/',
      icon: 'i-ri-earth-line',
      color: 'var(--va-c-primary)',
    },
  ],
  sponsor: {
    enable: true,
    title: '我很可爱，请给我钱！',
    methods: [],
  },
})
