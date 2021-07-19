import _ from "lodash";
import React from "react";

import Creation from "components/review/creation/type/answer/Creation";
import SuccessReviewCreation from "components/review/creation/Success";

class Presenter {
    constructor(props) {
        this.profile = {};

        this.ModalDialogService = props.dependencies.ModalDialogService;
        this.BasketService = props.dependencies.BasketService;
        this.Model = props.dependencies.Model;
        this.Router = props.dependencies.Router;
        this.AccountSectionEnum = props.dependencies.AccountSectionEnum;
    }

    /**
     * @private
     * @method _getDefaultSection
     * @returns {string}
     */
    _getDefaultSection() {
        return this.AccountSectionEnum.getPersonalDataAsValue();
    }

    /**
     * @method _getCurrentPage
     * @return {string}
     * @private
     */
    _getCurrentSection() {
        let query = this.Router.getCurrentRoute().query;

        return query.section || this._getDefaultSection();
    }

    /**
     * @public
     * @method getProfile
     * @param success {Function}
     * @return {Presenter}
     */
    getProfile(success) {
        if (_.isFunction(success)) {
            this.Model.getProfile((profile) => {
                this.profile = profile;

                success(profile);
            });
        }

        return this;
    }

    /**
     * @public
     * @method getBonus
     * @param success {Function}
     * @return {Presenter}
     */
    getBonus(success) {
        if (_.isFunction(success)) {
            this.Model.getBonus(success);
        }

        return this;
    }

    /**
     * @public
     * @method getThreads
     * @param userId {string}
     * @param success {Function}
     * @return {Presenter}
     */
    getThreads(userId, success) {
        if (userId && _.isFunction(success)) {
            this.Model.getThreads(userId, success);
        }

        return this;
    }

    /**
     * @public
     * @method _getOrders
     * @param userId {string}
     * @param success {Function}
     * @return {Presenter}
     */
    getOrders(userId, success) {
        if (userId && _.isFunction(success)) {
            this.Model.getOrders(userId, success);
        }

        return this;
    }

    /**
     * @method getWishLists
     * @param success {Function}
     * @return {Presenter}
     */
    getWishLists(success) {
        if (_.isFunction(success)) {
            this.Model.getWishLists(success);
        }

        return this;
    }

    /**
     * @method deleteItemsFromWishList
     * @param listId {string|number}
     * @param itemsId {Array}
     * @param callback {Function}
     * @return {Presenter}
     */
    deleteItemsFromWishList(listId, itemsId, callback) {
        if (listId && Array.isArray(itemsId) && _.isFunction(callback)) {
            this.Model.deleteItemsFromWishList(listId, itemsId, callback);
        }

        return this;
    }

    /**
     * @public
     * @method updateProfile
     * @param profile {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Presenter}
     */
    updateProfile(profile, success, error) {
        this.Model.updateProfile(profile, success, error);

        return this;
    }

    /**
     * @method addToBasket
     * @param item {Product}
     * @param success {Function}
     * @param error {Function}
     * @return {Presenter}
     */
    addToBasket(item, success, error) {
        this.BasketService.addItem(item.getCode(), success, error);

        return this;
    }

    /**
     * @private
     * @method _showSuccessMessage
     * @param message {string}
     */
    _showSuccessMessage(message) {
        this.ModalDialogService.open({
            className: "review-created",
            title: "",
            body: <SuccessReviewCreation message={message} />,
            size: this.ModalDialogService.getSizes().getSm(),
            type: this.ModalDialogService.getTypes().getInfo()
        });
    }

    /**
     * @private
     * @method _createAnswer
     * @param productId {string}
     * @param threadEntity {Thread}
     * @param review {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Review}
     */
    _createAnswer(productId, threadEntity, review, success, error) {
        this.Model.createAnswer(
            _.merge({}, review, {threadId: threadEntity.getId()}),
            productId,
            () => {
                success();

                this._showSuccessMessage("Получили Ваш ответ");
            },
            error
        );

        return this;
    }

    /**
     * @public
     * @method toAnswer
     * @param productId {string}
     * @param threadEntity {Thread}
     * @returns {Presenter}
     */
    toAnswer(productId, threadEntity) {
        this.ModalDialogService.open({
            className: "review-creation",
            title: "Отправить ответ",
            body: (
                <Creation
                    profile={this.profile}
                    confirmButtonName="Отправить ответ"
                    confirm={(...args) => this._createAnswer(productId, threadEntity, ...args)}
                />
            ),
            size: this.ModalDialogService.getSizes().getMd()
        });

        return this;
    }

    /**
     * @public
     * @method logout
     * @returns {Presenter}
     */
    logout() {
        this.Model.logout();

        return this;
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @return {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        let result = this.Model.normalizeInitialProps(initialData, pageInfo);

        result.currentSection = this._getCurrentSection();

        return result;
    }
}

export default Presenter;
