<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core'
import Giscus from '@giscus/vue'
import YunComment from 'valaxy-theme-yun/components/YunComment.vue'

const isDark = usePreferredDark()
</script>

<template>
  <YunComment>
    <Giscus
      repo="lgc2333/blog"
      repo-id="R_kgDOLr1GDQ"
      category="Announcements"
      category-id="DIC_kwDOLr1GDc4Cen96"
      mapping="og:title"
      strict="1"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      :theme="`https://blog.lgc2333.top/css/giscus/${isDark ? 'dark' : 'light'}.css`"
      lang="zh-CN"
      loading="lazy"
    ></Giscus>
  </YunComment>
</template>
