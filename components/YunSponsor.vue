<script lang="ts" setup>
import { useSiteConfig } from 'valaxy'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const siteConfig = useSiteConfig()
const sponsorBtnTitle = computed(() => {
  return siteConfig.value.sponsor?.title ?? t('reward.donate')
})
</script>

<template>
  <div class="yun-sponsor-container flex-center flex-col">
    <a href="/donate">
      <button
        class="sponsor-button yun-icon-btn shadow hover:shadow-md"
        :title="sponsorBtnTitle"
        text="red-400"
      >
        <div i-ri-heart-line />
      </button>
    </a>
  </div>
</template>
