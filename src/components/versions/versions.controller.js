export default class {
  constructor ($window, Versions) {
    'ngInject'

    this.$window = $window
    this.Versions = Versions

    Versions.getVersions()
      .then((versions) => {
        this.versions = versions.map((version) => {
          if (version === 'latest' && version === this.currentVersion && Versions.currentVersion) {
            return {
              name: `${version} (${Versions.currentVersion})`,
              id: version
            }
          }

          return { name: version, id: version }
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
