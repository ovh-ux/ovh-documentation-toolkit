import { snakeCase } from "lodash";

class VersionsService {
    constructor ($location, $q, $http, currentVersion) {
        "ngInject";

        this.$location = $location;
        this.$q = $q;
        this.$http = $http;
        this.currentVersion = currentVersion;
    }

    getInformations (clientUrl = this.$location.absUrl()) {
        const PROD_REGEX = /https?:\/\/(dev_)?([\w\-_]+)\.ui-kit\.ovh/;

        let branch = "local";
        let environment = "localhost";
        let version = "local";
        let params = "";
        const matches = PROD_REGEX.exec(clientUrl);
        const splitUrl = clientUrl.split("#");

        if (matches && matches.length === 3) {
            environment = matches[1] === "dev_" ? "dev" : "prod";
            branch = matches[2];
            version = branch === "master" ? "latest" : branch;
        }

        if (splitUrl.length === 2) {
            params = `#${splitUrl[1]}`;
        }

        return {
            branch,
            environment,
            version,
            params
        };
    }

    getUrl (environment, branch, path = "") {
        switch (environment) {
        case "dev":
            return `http://dev_${branch}.ui-kit.ovh${path}`;
        case "prod":
            return `http://${branch}.ui-kit.ovh${path}`;
        default:
            return `http://localhost:${this.$location.port()}${path}`;
        }
    }

    getNewVersionUrl (newVersion, clientUrl = this.$location.absUrl()) {
        const informations = this.getInformations(clientUrl);
        const newVersionFormatted = newVersion === "latest" ? "master" : snakeCase(newVersion);

        return this.getUrl(informations.environment, newVersionFormatted, informations.params);
    }

    getVersions () {
        const informations = this.getInformations();

        if (informations.environment === "localhost") {
            return this.$q.resolve(["local"]);
        }

        const versionUrl = this.getUrl(informations.environment, "master", "/versions.json");

        return this.$http.get(versionUrl)
            .then((result) => result.data)
            .then((versions) => {
                const formattedVersions = versions.map(snakeCase);

                if (formattedVersions.includes(informations.version)) {
                    return versions;
                }

                return [
                    informations.version,
                    ...versions
                ];
            });
    }
}

export default class {
    constructor () {
        "ngInject";
    }

    setCurrentVersion (version) {
        this.currentVersion = version;
    }

    $get ($location, $q, $http) {
        "ngInject";
        return new VersionsService($location, $q, $http, this.currentVersion);
    }
}
