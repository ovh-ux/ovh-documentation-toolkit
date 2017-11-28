import _ from "lodash";

export default class {
    constructor ($rootScope, $state, StateHelpers) {
        "ngInject";

        this.$state = $state;
        this.StateHelpers = StateHelpers;
        this.rootState = "showcase";

        this.rootChildren = this.getOrderedChildrenState(this.rootState);
        this.secondLevelsChildren = this.getSecondLevelsChildren();
        this.currentSecondLevelStateName = this.getCurrentSecondLevelStateName();

        this.stateChangeSuccessHandler = $rootScope.$on("$stateChangeSuccess", () => {
            this.currentSecondLevelStateName = this.getCurrentSecondLevelStateName();
        });
    }

    $onDestroy () {
        this.stateChangeSuccessHandler();
    }

    getOrderedChildrenState (stateName) {
        let childrenState = _.sortBy(this.StateHelpers.getChildren(stateName), (childState) => -1 * _.get(childState, "weight", 0));
        childrenState = _.map(childrenState, (childState) => ({
            state: childState.name,
            name: _.get(childState, "friendlyName", `<unnamed state: ${childState.name}>`),
            groups: _.get(childState, "groups"),
            group: _.get(childState, "group")
        }));
        return childrenState;
    }

    getOrderedAndGroupedChildrenState (stateName) {
        return _.groupBy(this.getOrderedChildrenState(stateName), "group");
    }

    getGroupsOrder (orderedAndGroupedChildrenState, groupsDetails) {
        const keys = Object.keys(orderedAndGroupedChildrenState);
        return _.orderBy(keys, groupName =>

            // The -9999 weigth is arbitrary, it is only to keep the
            // ungrouped element at the beginning of the list so the
            // user can use negative and positive values.
            groupName === "undefined" ? -Infinity : -1 * _.get(groupsDetails, [groupName, "weight"], 0)
        );
    }

    getSecondLevelsChildren () {
        let secondLevelsChildren = _.map(this.rootChildren, (rootChild) => {
            const orderedAndGroupedChildrenState = this.getOrderedAndGroupedChildrenState(rootChild.state);
            const groupsDetails = _.get(rootChild, "groups");

            return [rootChild.state, {
                name: this.getSecondLevelGroupName(rootChild.state),
                children: orderedAndGroupedChildrenState,
                groupsOrder: this.getGroupsOrder(orderedAndGroupedChildrenState, groupsDetails),
                groups: groupsDetails
            }];
        });
        secondLevelsChildren = _.fromPairs(secondLevelsChildren);
        return secondLevelsChildren;
    }

    getSecondLevelStateName (stateName) {
        let secondLevelStateName = _.split(stateName, ".");
        secondLevelStateName = _.take(secondLevelStateName, 2);
        secondLevelStateName = _.join(secondLevelStateName, ".");
        return secondLevelStateName;
    }

    getCurrentSecondLevelStateName () {
        return this.getSecondLevelStateName(this.$state.current.name);
    }

    getSecondLevelGroupName (stateName) {
        return _.get(this.$state.get(stateName), "groupName", `<groupName property missing on state ${stateName}>`);
    }

    updateSecondLevelInformation (state) {
        this.secondLevelRootState = this.getSecondLevelStateName(state.name);
        this.secondLevelRootStateNoChildrenMessage = `No children found under state ${this.secondLevelRootState}`;
        this.secondLevelGroupName = this.getSecondLevelGroupName(this.secondLevelRootState);
    }

    onListItemClick (stateName) {
        this.toggle = false;
        this.$state.go(stateName);
    }
}
