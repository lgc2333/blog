import { defineSiteConfig } from 'valaxy'

const TIME_DAY = 1000 * 60 * 60 * 24

export default defineSiteConfig({
  url: 'https://blog.lgc2333.top/',
  title: '饼干的 Blog',
  subtitle: '',
  description: '',
  author: {
    name: 'student_2333',
    email: 'lgc2333@126.com',
    link: 'https://lgc2333.top/',
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
  fuse: {
    options: {
      ignoreLocation: true,
      keys: ['title', 'excerpt', 'author', 'tags', 'categories', 'link', 'content'],
    },
  },
  license: { enabled: true, type: 'by-nc' },
  mediumZoom: { enable: true, selector: '.markdown-body *:not(a img, img[data-no-zoom])' },
  frontmatter: { time_warning: TIME_DAY * 90 },
  comment: { enable: true },

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
    {
      name: 'GitHub',
      link: 'https://github.com/lgc2333/blog',
      icon: 'i-ri-github-line',
      color: 'var(--va-c-text)',
    },
  ],
  sponsor: {
    enable: true,
    title: '赞助我',
    description: '如果你觉得这篇文章有意义，不妨赞助我一下',
  },
})
