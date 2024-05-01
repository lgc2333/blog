import { defineAppSetup } from 'valaxy'

import { install as installGtag } from './gtag'

export default defineAppSetup(async (ctx) => {
  installGtag(ctx)

  const VueSvgInlinePlugin = (await import('vue-svg-inline-plugin')).default
  ctx.app.use(VueSvgInlinePlugin)
})
