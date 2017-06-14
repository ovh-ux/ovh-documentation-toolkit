import _ from 'lodash'

export default class {
  constructor ($rootScope, $state, StateHelpers) {
    'ngInject'

    this.$state = $state
    this.StateHelpers = StateHelpers
    this.rootState = 'showcase'

    this.rootChildren = this.getOrderedChildrenState(this.rootState)
    this.secondLevelsChildren = this.getSecondLevelsChildren()
    this.currentSecondLevelStateName = this.getCurrentSecondLevelStateName()

    this.stateChangeSuccessHandler = $rootScope.$on('$stateChangeSuccess', (event, toState) => {
      this.currentSecondLevelStateName = this.getCurrentSecondLevelStateName()
    })
  }

  $onDestroy () {
    this.stateChangeSuccessHandler()
  }

  getOrderedChildrenState (stateName) {
    let childrenState = _.sortBy(this.StateHelpers.getChildren(stateName), (childState) => {
      return -1 * _.get(childState, 'weight', 0)
    })
    childrenState = _.map(childrenState, (childState) => {
      return {
        state: childState.name,
        name: _.get(childState, 'friendlyName', `<unnamed state: ${childState.name}>`)
      }
    })
    return childrenState
  }

  getSecondLevelsChildren () {
    let secondLevelsChildren = _.map(this.rootChildren, (rootChild) => {
      return [rootChild.state, {
        name: this.getSecondLevelGroupName(rootChild.state),
        children: this.getOrderedChildrenState(rootChild.state)
      }]
    })
    secondLevelsChildren = _.fromPairs(secondLevelsChildren)
    return secondLevelsChildren
  }

  getSecondLevelStateName (stateName) {
    let secondLevelStateName = _.split(stateName, '.')
    secondLevelStateName = _.take(secondLevelStateName, 2)
    secondLevelStateName = _.join(secondLevelStateName, '.')
    return secondLevelStateName
  }

  getCurrentSecondLevelStateName () {
    return this.getSecondLevelStateName(this.$state.current.name)
  }

  getSecondLevelGroupName (stateName) {
    return _.get(this.$state.get(stateName), 'groupName', `<groupName property missing on state ${stateName}>`)
  }

  updateSecondLevelInformation (state) {
    this.secondLevelRootState = this.getSecondLevelStateName(state.name)
    this.secondLevelRootStateNoChildrenMessage = `No children found under state ${this.secondLevelRootState}`
    this.secondLevelGroupName = this.getSecondLevelGroupName(this.secondLevelRootState)
  }

  onListItemClick (stateName) {
    this.toggle = false
    this.$state.go(stateName)
  }
}
