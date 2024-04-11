<script setup lang="ts">
import { useScriptTag } from '@vueuse/core'

import YunComment from 'valaxy-theme-yun/components/YunComment.vue'

useScriptTag('https://giscus.app/client.js', () => {}, {
  async: true,
  crossOrigin: 'anonymous',
  attrs: {
    'data-repo': 'lgc2333/blog',
    'data-repo-id': 'R_kgDOLr1GDQ',
    'data-category': 'Announcements',
    'data-category-id': 'DIC_kwDOLr1GDc4Cen96',
    'data-mapping': 'og:title',
    'data-strict': '1',
    'data-reactions-enabled': '1',
    'data-emit-metadata': '0',
    'data-input-position': 'top',
    'data-theme': 'https://blog.lgc2333.top/giscus.css',
    'data-lang': 'zh-CN',
    'data-loading': 'lazy',
  },
})
</script>

<template>
  <YunComment>
    <div class="giscus"></div>
  </YunComment>
</template>
