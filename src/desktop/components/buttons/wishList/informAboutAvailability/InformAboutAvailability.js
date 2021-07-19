/* eslint-disable max-len */
import React from "react";
import classNames from "classnames";

import StatusTypeEnum from "app/core/utilites/enum/product/status/type";

import AddToWishList from "components/buttons/wishList/addToWishList/AddToWishList";

class InformAboutAvailability extends AddToWishList {
    constructor(props) {
        super(props);

        this.statusTypeEnum = StatusTypeEnum.getInstance();

        this.btnNames = {
            defaultName: this.stringsResource.informAboutAvailability,
            checkedName: this.stringsResource.willInformAboutAvailability
        };
    }

    /**
     * @protected
     * @method isAvailableButton
     * @returns {boolean}
     */
    isAvailableButton() {
        return this.statusTypeEnum.isUnavailable(this.product.getStatus().getType());
    }

    /**
     * @protected
     * @method getClasses
     * @returns {Object}
     */
    getClasses() {
        return classNames({
            "btn-md btn-block inform-about-availability d-flex align-items-center justify-content-center": true,
            "btn-default": !this.state.inWishList
        }, this.props.className);
    }

    /**
     * @method renderAddingToWishListButton
     * @return {React.element}
     * @protected
     */
    renderAddingToWishListButton() {
        return (
            <button
                className={this.getClasses()}
                type="button"
                disabled={this.isDisabled()}
                onClick={this.addToWishList}
            >
                {this.getBtnName()}
            </button>
        );
    }

    /**
     * @method _renderRedirectToAccountButton
     * @return {React.element}
     * @protected
     */
    renderRedirectToAccountButton() {
        return (
            <a
                href={this.getUrlForWishList()}
                className={
                    classNames("inform-about-availability inform-about-availability--active d-inline-flex align-items-center text-decoration-none cursor-pointer", this.props.className)
                }
            >
                <span className="icon icon-done" />

                {this.getBtnName()}
            </a>
        );
    }
}

export default InformAboutAvailability;
