import template from './themes.html'
import controller from './themes.controller'

export default {
  template,
  controller,
  bindings: {
    onChange: '&'
  }
}
