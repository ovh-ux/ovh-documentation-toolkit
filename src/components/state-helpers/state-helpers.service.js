import { includes } from 'lodash'

export default class {
  constructor ($state) {
    'ngInject'

    this.$state = $state
  }

  getChildren (stateName, firstLevelOnly = true) {
    var prefixToFind = stateName + '.'

    return this.$state.get().filter(function (state) {
      if (includes(state.name, prefixToFind)) {
        if (firstLevelOnly) {
          var stateNameWithoutPrefix = state.name.replace(prefixToFind, '')

          // Exclude all subs states, only take the first child level
          return !includes(stateNameWithoutPrefix, '.')
        } else {
          return true
        }
      }

      return false
    })
  }
}
