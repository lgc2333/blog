<script lang="ts" setup></script>

<template>
  <div class="ai-generated-excerpt rounded-lg bg-$va-c-bg-alt p-4">
    <div font="black" flex items-center>
      <div mr-1 i-ri-robot-2-line />
      <div>由 AI 生成的内容</div>
    </div>
    <div op="90" mt-1>
      <slot />
    </div>
  </div>
</template>
