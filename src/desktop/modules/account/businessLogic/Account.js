import _ from "lodash";

class Account {
    constructor(props) {
        this.Repository = props.dependencies.Repository;

        this.AuthorizationService = props.dependencies.AuthorizationService;
        this.ReviewService = props.dependencies.ReviewService;
        this.WishListService = props.dependencies.WishListService;

        this.CommentRubricEntity = props.dependencies.CommentRubricEntity;
        this.ProfileEntity = props.dependencies.ProfileEntity;
        this.ThreadEntity = props.dependencies.ThreadEntity;
        this.OrderEntity = props.dependencies.OrderEntity;
        this.WishListEntity = props.dependencies.WishListEntity;
    }

    /**
     * @method _buildReview
     * @param review {Object}
     * @param productId {string}
     * @return {Object}
     * @private
     */
    _buildReview(review, productId) {
        return _.merge({}, review, {productId});
    }

    /**
     * @public
     * @method getProfile
     * @param callback {Function}
     * @returns {Account}
     */
    getProfile(callback) {
        this.AuthorizationService.getProfile((profile) => {
            callback(this.AuthorizationService.convertToEmployeeEntity(profile));
        }, () => callback(this.AuthorizationService.convertToEmployeeEntity({})));

        return this;
    }

    /**
     * @public
     * @method getThreads
     * @param userId {string}
     * @param success {string}
     * @return {Account}
     */
    getThreads(userId, success) {
        this.ReviewService.getThreadsByUserId(
            {id: userId},
            (threads) => {
                success(threads.map((item) => new this.ThreadEntity(item)));
            }, () => {
                success([]);
            }
        );

        return this;
    }

    /**
     * @public
     * @method _getBonus
     * @param callback {Function}
     * @returns {Account}
     */
    getBonus(callback) {
        this.getProfile((profile) => {
            callback(profile.getBonus());
        }, () => callback(new this.ProfileEntity({}).getBonus()));

        return this;
    }

    /**
     * @public
     * @method getWishLists
     * @param success {Function}
     * @returns {Account}
     */
    getWishLists(success) {
        this.WishListService.getLists(success, () => {
            success([]);
        });

        return this;
    }

    /**
     * @method deleteItemsFromWishList
     * @param listId {string|number}
     * @param itemsId {Array}
     * @param callback {Function}
     * @return {Account}
     */
    deleteItemsFromWishList(listId, itemsId, callback) {
        this.WishListService.deleteItems(listId, itemsId, () => {
            callback();
        }, () => {
            callback();
        });

        return this;
    }

    /**
     * @public
     * @method getOrders
     * @param userId {string}
     * @param success {Function}
     * @return {Account}
     */
    getOrders(userId, success) {
        this.Repository.getOrders(
            {id: userId},
            (items) => {
                success(items.map((item) => new this.OrderEntity(item)));
            }, () => {
                success([]);
            }
        );

        return this;
    }

    /**
     * @public
     * @method createAnswer
     * @param review {Object}
     * @param productId {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Account}
     */
    createAnswer(review, productId, success, error) {
        this.ReviewService.createAnswer(this._buildReview(review, productId), success, error);

        return this;
    }

    /**
     * @public
     * @method updateProfile
     * @param profile {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    updateProfile(profile, success, error) {
        this.Repository.updateProfile(profile,
            (response) => {
                success(response.data);
            }, error);

        return this;
    }

    /**
     * @public
     * @method logout
     * @return {Presenter}
     */
    logout() {
        this.AuthorizationService.logout();

        return this;
    }

    /**
     * @public
     * @method getInitialProps
     * @returns {Promise}
     */
    getInitialProps() {
        let result = {
            profile: {},
            threads: [],
            bonus: [],
            orders: [],
            wishLists: []
        };

        return Promise.resolve(result);
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        let profileEntity = this.AuthorizationService.convertToProfileEntity(initialData.profile);

        return {
            profile: profileEntity,
            bonus: profileEntity.getBonus(),
            threads: initialData.threads,
            orders: initialData.orders,
            //wishList: initialData.wishList.map((item) => new this.WishListEntity(item)),
            pageInfo
        };
    }
}

export default Account;
