# OVH Documentation toolkit

![OVH component](https://user-images.githubusercontent.com/3379410/27423240-3f944bc4-5731-11e7-87bb-3ff603aff8a7.png)

This project provides some tools to quickly and simply build a documentation application based on AngularJS.

![Project status alpha](https://img.shields.io/badge/status-alpha-blue.svg) [![Github tag](https://img.shields.io/github/tag/ovh-ux/ovh-documentation-toolkit.svg)]() ![Maintenance](https://img.shields.io/maintenance/yes/2018.svg) [![Chat on gitter](https://img.shields.io/gitter/room/ovh/ux.svg)](https://gitter.im/ovh/ux)

## Installation

```bash
yarn add https://github.com/ovh-ux/ovh-documentation-toolkit.git
```

## Usage

```javascript
const app = angular
  .module('my-documentation-app', [
    'ovh-documentation-toolkit'
  ])
```

## Components

### Themes

Shows a select containing all themes available related to the ui. Themes can be defined through the `ThemesProvider` like this:

```js
ThemesProvider.setThemes([
    {
        id: "",
        name: "None"
    },
    {
        id: "oui-theme-sapphire",
        name: "Sapphire"
    },
    {
        id: "oui-theme-diamond",
        name: "Diamond"
    }
]);
```

### Component status

Shows development status of a component. There is two types of statuses, `cx-design` and `ux`. Depending of the combinaison of both statuses, a status level is chosen between `error`, `warning`, `info` and `success`.

Statuses are configured through the `ComponentStatusProvider` like this:

```js
const CX_DESIGN_LEVELS = {
    error: ["deprecated"],
    warning: ["none"],
    info: ["partial"],
    success: ["complete"]
};

const UX_LEVELS = {
    error: ["prototype"],
    warning: ["beta"],
    info: ["rc"],
    success: ["complete"]
};

ComponentStatusProvider.setReadmeUrl("#!/documentation/component-status");
ComponentStatusProvider.setFindMessageTypeFunc((level, cxDesign, ux) =>
    includes(CX_DESIGN_LEVELS[level], cxDesign) || includes(UX_LEVELS[level], ux)
);
```

Once configuration is done, user can write this to show the component status:

```html
<component-status cx-design="partial" ux="beta"></component-status>
```

### Versions

**(DEPRECATED)** This component should not be used anymore and is not maintained anymore.

## States

### root

When user open the website without any routes, he will be redirected to the `showcase.documentation` state.

### showcase

State used as a base to all routes that needs to show documentation menus. Sub states will automatically populate menus.

```js
$stateProvider
        .state("showcase.ovh-ui-kit", {
            url: "/ovh-ui-kit",
            [...]
        });
```

#### First level children states

They can use multiple attributes to populate menus and write better texts. Those items will appear on the top menu.

- **friendlyName**: Well formatted name that appears in the top menu
- **groupName**: Name that appears as header of side menu
- **weight**: Weight of an item. By default, items have 0 as weight. Items are rendered from left to right (bigger weight to smaller weight) and sorted alphabetically from a to z when numbers are equals
- **groups**: List of groups used to group children together in side menu

```js
$stateProvider
    .state("showcase.oui-angular", {
        url: "/oui-angular",
        friendlyName: "Components",
        groupName: "oui-angular components",
        redirectTo: "showcase.oui-angular.introduction",
        template: "<ui-view></ui-view>",
        weight: 9000,
        groups: {
            basic: {
                name: "Basic",
                weight: 9000
            },
            form: {
                name: "Form",
                weight: 8000
            }
        }
    });
```

#### Second level children states

They can use multiple attributes to populate menus write better texts. Those items will appear on the side menu.

- **friendlyName**: Well formatted name that appears in the side menu
- **group**: Group key that correspond to first level state group to get group details
- **weight**: Weight of an item inside its group. By default, items have 0 as weight. Items are rendered from top to bottom (bigger weight to smaller weight) and sorted alphabetically from a to z when numbers are equals

```js
$stateProvider
    .state("showcase.oui-angular.button", {
        url: "/button",
        friendlyName: "Button",
        template: buttonTemplate,
        group: "basic",
        weight: 3000
    })
```

## States utilities

### redirectTo

When a state is declared, a new attribute can be used to automatically redirect the user to another state.

```js
$stateProvider
    .state("showcase", {
        redirectTo: "showcase.documentation",
        template: "<showcase-ui></showcase-ui>"
    })
```

## Contribute

Please refer to [CONTRIBUTING](CONTRIBUTING.md).
