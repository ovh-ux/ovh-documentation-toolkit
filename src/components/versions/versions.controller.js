import { snakeCase } from 'lodash'

export default class {
  constructor ($window, Versions) {
    'ngInject'

    this.$window = $window
    this.Versions = Versions

    Versions.getVersions()
      .then((versions) => {
        this.versions = versions.map((version) => {
          if (version === 'latest' || version === 'master') {
            return { name: 'latest', id: 'latest' }
          }

          return { name: version, id: snakeCase(version) }
        })
      })

    this.currentVersion = Versions.getInformations().version
    this.selectedVersion = this.currentVersion
  }

  onVersionChanged (version) {
    console.log(`version changing to ${version}`, this.Versions.getNewVersionUrl(version))

    this.$window.location.href = this.Versions.getNewVersionUrl(version)
  }
}
