import { defineAppSetup } from 'valaxy'
import VueSvgInlinePlugin from 'vue-svg-inline-plugin'

import { install as installGtag } from './gtag'

export default defineAppSetup(async (ctx) => {
  installGtag(ctx)
  ctx.app.use(VueSvgInlinePlugin, { cache: { persistent: false } })
})
