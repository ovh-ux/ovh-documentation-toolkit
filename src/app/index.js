import ComponentStatus from "../components/component-status/component-status.component";
import ComponentStatusProvider from "../components/component-status/component-status.provider";
import redirectToInit from "../components/init/redirectTo.run";
import rootRoutes from "./index.routes";
import Showcase from "../components/showcase/showcase.component";
import StateHelpers from "../components/state-helpers/state-helpers.service";
import Themes from "../components/themes/themes.component";
import ThemesProvider from "../components/themes/themes.provider";
import Versions from "../components/versions/versions.component";
import VersionsProvider from "../components/versions/versions.provider";

const ovhDocumentationToolkitModule = angular
    .module("ovh-documentation-toolkit", [
        "ui.router",
        "oui"
    ])
    .component("showcaseUi", Showcase)
    .service("StateHelpers", StateHelpers)
    .provider("Versions", VersionsProvider)
    .component("versionsSelector", Versions)
    .provider("Themes", ThemesProvider)
    .component("themesSelector", Themes)
    .provider("ComponentStatus", ComponentStatusProvider)
    .component("componentStatus", ComponentStatus)
    .config(rootRoutes)
    .run(redirectToInit);

export default ovhDocumentationToolkitModule;
