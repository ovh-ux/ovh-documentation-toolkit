export default function ($rootScope, $state) {
  'ngInject'

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (toState.redirectTo) {
      event.preventDefault()
      $state.go(toState.redirectTo, toParams, { location: 'replace' })
    }
  })
}
