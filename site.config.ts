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
  feed: { name: 'rss', favicon: '/assets/favicon.png' },
  search: { enable: true, type: 'fuse' },
  fuse: { options: { ignoreLocation: true } },
  license: { enabled: true, type: 'by-nc' },
  mediumZoom: { enable: true, selector: '.markdown-body *:not(a img, img[data-no-zoom])' },

  social: [
    {
      name: 'RSS',
      link: '/rss.xml',
      icon: 'i-ri-rss-line',
      color: 'var(--va-c-text)',
    },
    {
      name: '主站',
      link: 'https://lgc2333.top/',
      icon: 'i-ri-earth-line',
      color: 'var(--va-c-text)',
    },
  ],
  sponsor: {
    enable: true,
    title: '我很可爱，请给我钱！',
    methods: [],
  },
})
