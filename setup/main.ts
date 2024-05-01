import { defineAppSetup } from 'valaxy'
import VueSvgInlinePlugin from 'vue-svg-inline-plugin'

import { install as installGtag } from './gtag'

export default defineAppSetup((ctx) => {
  installGtag(ctx)
  ctx.app.use(VueSvgInlinePlugin)
})
