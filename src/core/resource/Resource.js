import _ from "lodash";

class Resource {
    constructor(props) {
        this.resources = props.resources;
    }

    /**
     * @method getMobileNavigation
     * @return {Array}
     */
    getMobileNavigation() {
        return _.merge([], this.resources.mobileNavigation.getNavigation());
    }

    /**
     * @method getFooter
     * @return {Object}
     */
    getFooter() {
        let self = this;

        return {
            getNavigation() {
                return _.merge({}, self.resources.footerNavigation.getNavigation());
            }
        };
    }

    /**
     * @method getAccount
     * @return {Object}
     */
    getAccount() {
        let self = this;

        return {
            getNavigationByKey(key) {
                return self.resources.account.navigation.getByKey(key);
            },
            getNavigation() {
                return _.merge([], self.resources.account.navigation.getItems());
            }
        };
    }
}

export default Resource;
