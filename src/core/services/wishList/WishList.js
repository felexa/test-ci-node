import _ from "lodash";

class WishList {
    constructor(props) {
        /**
         * @property requestsProcessing
         * @type {Object}
         */
        this.requestsProcessing = {
            getLists: new props.dependencies.RequestQueue()
        };

        this.events = {
            update: "update"
        };

        this.observer = new props.dependencies.Observer().installTo(this);

        this.Repository = props.dependencies.Repository;
        this.WishListEntity = props.dependencies.WishListEntity;
    }

    /**
     * @method _hasItemById
     * @param lists {WishList[]}
     * @param itemId {string|number}
     * @return {boolean}
     * @private
     */
    _hasItemById(lists, itemId) {
        return Boolean(this.getAllItems(lists).find((item) => item.getId() === itemId));
    }

    /**
     * @method _triggerEvent
     * @param event {string}
     * @param [data] {*}
     * @return {WishList}
     * @private
     */
    _triggerEvent(event, data) {
        this.observer.trigger(event, data);

        return this;
    }

    /**
     * @method hasItemById
     * @param itemId {string|number}
     * @param success {Function}
     * @param error {Function}
     * @return {WishList}
     */
    hasItemById(itemId, success, error) {
        this.getLists((lists) => {
            success(this._hasItemById(lists, itemId));
        }, error);

        return this;
    }

    /**
     * @method getAllItems
     * @param lists {WishList[]}
     * @return {Product[]}
     * @public
     */
    getAllItems(lists) {
        let result = [];

        if (Array.isArray(lists)) {
            lists.forEach((list) => {
                result = result.concat(list.getProductList());
            });
        }

        return result;
    }

    /**
     * @public
     * @method getLists
     * @param success {Function}
     * @param error {Function}
     * @returns {WishList}
     */
    getLists(success, error) {
        this.requestsProcessing.getLists.addSuccess(success).addError(error);

        if (!this.requestsProcessing.getLists.isPending()) {
            this.requestsProcessing.getLists.toPending();

            this
                .Repository
                .getLists((list) => {
                    this.requestsProcessing.getLists.success([[new this.WishListEntity(list)]]);
                }, (exception) => {
                    this.requestsProcessing.getLists.error(exception);
                })
                .then(() => {
                    this.requestsProcessing.getLists.clear();
                })
                .catch(() => {
                    this.requestsProcessing.getLists.clear();
                });
        }

        return this;
    }

    /**
     * @public
     * @param listId {string|number}
     * @param itemId {string|number}
     * @param success {Function}
     * @param error {Function}
     * @returns {WishList}
     */
    addItem(listId, itemId, success, error) {
        if (itemId && _.isFunction(success) && _.isFunction(error)) {
            this.Repository.addItem(itemId, () => {
                success();

                this._triggerEvent(this.events.update);
            }, error);
        }

        return this;
    }

    /**
     * @method _deleteItemWithResolvedPromise
     * @param listId {string|number}
     * @param products {Array}
     * @return {Promise}
     * @private
     */
    // _deleteItemWithResolvedPromise(listId, products) {
    //     return new Promise((resolve) => {
    //         this
    //             .Repository
    //             .deleteItem(listId, products, () => {
    //                 resolve();
    //             }, () => {
    //                 resolve();
    //             });
    //     });
    // }

    /**
     * @public
     * @method deleteItem
     * @param listId {string|number}
     * @param itemsId {Array}
     * @param success {Function}
     * @param error {Function}
     * @returns {WishList}
     */
    deleteItems(listId, itemsId, success, error) {
        if (listId && Array.isArray(itemsId) && _.isFunction(success) && _.isFunction(error)) {
            this.Repository.deleteItem(listId, itemsId, () => {
                success();

                this._triggerEvent(this.events.update);
            }, error);
        }

        return this;
    }

    /**
     * @method deleteItems
     * @param listId {string|number}
     * @param itemsId {Array}
     * @param success {Function}
     * @param error {Function}
     */
    // deleteItems(listId, itemsId, success, error) {
    //     if (itemsId && _.isFunction(success) && _.isFunction(error)) {
    //         Promise.all(
    //             itemsId.map((id) => this._deleteItemWithResolvedPromise(listId, id))
    //         ).then(() => {
    //             success();

    //             this._triggerEvent(this.events.update);
    //         });
    //     }
    // }
}

export default WishList;
