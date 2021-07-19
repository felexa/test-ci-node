import _ from "lodash";

class Menu {
    constructor(props) {
        this.isMenuOpen = false;

        this.observer = new props.dependencies.Observer().installTo(this);

        this.Repository = props.dependencies.Repository;
    }

    /**
     * @public
     * @method getCatalog
     * @param success {Function}
     * @param error {Function}
     * @return {Menu}
     */
    getCatalog(success, error) {
        if (_.isFunction(success) && _.isFunction(error)) {
            this.Repository.getCatalog(success, error);
        }

        return this;
    }

    /**
     * @public
     * @method toggle
     * @param [state] {boolean|undefined}
     * @param eventName {string}
     * @param screen {string}
     * @return {Menu}
     */
    toggle(state, eventName, screen) {
        this.isMenuOpen = state === undefined ? !this.isMenuOpen : Boolean(state);

        this.observer.trigger(
            "toggle",
            this.isMenuOpen,
            this.isMenuOpen && eventName ? eventName : "",
            screen
        );

        return this;
    }
}

export default Menu;
