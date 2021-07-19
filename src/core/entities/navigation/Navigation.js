import _ from "lodash";

import Entity from "app/core/entities/Entity";

class Navigation extends Entity {
    isActive() {
        return Boolean(this.entity.active);
    }

    getTitle() {
        return this.entity.title || "";
    }

    getUrl() {
        return this.entity.url || "";
    }

    getIconUrl() {
        return (this.entity.icon && this.entity.icon.url) || "";
    }

    getIconClassName() {
        return "";
    }

    getItems() {
        return [];
    }

    setActive(value) {
        this.entity.active = Boolean(value);

        return this;
    }

    getCount() {
        return Number(this.entity.count) || 0;
    }

    setCount(value) {
        if (_.isNumber(value)) {
            this.entity.count = value;
        }

        return this;
    }
}

export default Navigation;
