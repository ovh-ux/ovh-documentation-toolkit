import {
  isEmpty,
  last,
  initial
} from 'lodash'

class VersionsService {
  constructor ($location, $http, currentVersion) {
    'ngInject'

    this.$location = $location
    this.$http = $http
    this.currentVersion = currentVersion
  }

  getInformations (clientUrl = this.$location.absUrl()) {
    var clientUrlSplit = clientUrl.split('#')
    var leftPartSplit = clientUrlSplit[0].split('/')

    if (isEmpty(last(leftPartSplit))) {
      leftPartSplit = initial(leftPartSplit)
    }

    var version = 'latest'

    if (leftPartSplit.length > 3) {
      version = last(leftPartSplit)
      leftPartSplit = initial(leftPartSplit)
    }

    return {
      rightPart: clientUrlSplit.length === 2 ? `#${clientUrlSplit[1]}` : null,
      leftPartWithoutVersion: leftPartSplit.join('/'),
      leftPartWithVersion: clientUrlSplit[0],
      version: version
    }
  }

  getNewVersionUrl (newVersion, clientUrl = this.$location.absUrl()) {
    var informations = this.getInformations(clientUrl)

    var leftPart = informations.leftPartWithVersion.replace(informations.version, newVersion)

    if (informations.rightPart) {
      return leftPart + informations.rightPart
    }

    return leftPart
  }

  getVersions () {
    var informations = this.getInformations()

    return this.$http.get(`${informations.leftPartWithoutVersion}/versions.json`)
      .then((result) => {
        return result.data
      })
  }
}

export default class {
  constructor () {
    'ngInject'
  }

  setCurrentVersion (version) {
    this.currentVersion = version
  }

  $get ($location, $http) {
    'ngInject'
    return new VersionsService($location, $http, this.currentVersion)
  }
}
