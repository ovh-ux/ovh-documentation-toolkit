import template from './component-status.html'
import controller from './component-status.controller'

export default {
  template,
  controller,
  bindings: {
    cxDesign: '@',
    ux: '@'
  }
}
