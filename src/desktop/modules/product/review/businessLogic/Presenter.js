/* eslint-disable max-len */
import _ from "lodash";

class Presenter {
    constructor(props) {
        /**
         * @property analogs
         * @type {Rubric[]}
         */
        this.analogs = [];

        /**
         * @property reviewId
         * @type {string}
         */
        this.reviewId = "";

        /**
         * @property language
         * @type {string}
         */
        this.language = "";

        /**
         * @property review
         * @type {Review}
         */
        this.review = null;

        /**
         * @property product
         * @type {Product}
         */
        this.product = null;

        /**
         * @property routeContainer
         * @type {Object}
         */
        this.routeContainer = {};

        this.observer = new props.dependencies.Observer().installTo(this);

        this.Resource = props.dependencies.Resource;
        this.Model = props.dependencies.Model;
        this.AuthorizationService = props.dependencies.AuthorizationService;
        this.Router = props.dependencies.Router;
        this.Analytics = props.dependencies.Analytics;

        this.LanguageEnum = props.dependencies.LanguageEnum;
        this.TabNameEnum = props.dependencies.TabNameEnum;
        this.ContentTypeEnum = props.dependencies.ContentTypeEnum;
        this.RouteNamesEnum = props.dependencies.RouteNamesEnum;

        // eslint-disable-next-line no-underscore-dangle
        this
            ._subscribeEvents();
    }

    /**
     * @private
     * @method _hasTab
     * @param name {string}
     * @returns {boolean}
     */
    _hasTab(name) {
        return this.TabNameEnum.hasValue(name);
    }

    /**
     * @public
     * @method isReviewCard
     * @return {boolean}
     */
    isReviewCard() {
        return Boolean(this.reviewId);
    }

    /**
     * @public
     * @method isAuthorized
     * @returns {boolean}
     */
    isAuthorized() {
        return this.AuthorizationService.isAuthorized();
    }

    /**
     * @method _getStringsResource
     * @returns {Object}
     * @private
     */
    _getStringsResource() {
        return this.Resource.getStrings(this.language);
    }

    /**
     * @private
     * @method _getDefaultTabName
     * @returns {string}
     */
    _getDefaultTabName() {
        return this.TabNameEnum.getMainAsValue();
    }

    /**
     * @public
     * @method getAnalytics
     * @returns {Analytics}
     */
    getAnalytics() {
        return this.Analytics;
    }

    /**
     * @public
     * @method getUrls
     * @returns {{getAllReviews(): string}}
     */
    getUrls() {
        let self = this;

        return {
            /**
             * @public
             * @method getAllReviews
             * @return {string}
             */
            getAllReviews() {
                // eslint-disable-next-line no-underscore-dangle
                return self._buildBaseProductPath(self.TabNameEnum.getReviewAsValue());
            }
        };
    }

    /**
     * @public
     * @method getTabs
     * @returns {Array}
     */
    getTabs() {
        let result = this._buildTabs();

        this._setActiveTabByName(
            result,
            "review"
        );

        return result;
    }

    /**
     * @public
     * @method getReviewById
     * @param id {string}
     * @param success {function}
     * @param error {function}
     * @returns {Presenter}
     */
    getReviewById(id, success, error) {
        if (Boolean(id) && _.isFunction(success) && _.isFunction(error)) {
            this.Model.getReviewById(id, success, error);
        }

        return this;
    }

    /**
     * @private
     * @method _setActiveTabByName
     * @param items {Array}
     * @param tabName {string}
     * @returns {Array}
     */
    _setActiveTabByName(items, tabName) {
        items.forEach(function (item) {
            item.active = item.name === tabName;
        });

        return items;
    }

    /**
     * @private
     * @method _buildBaseProductPath
     * @param [tabName] {string}
     * @returns {string}
     */
    _buildBaseProductPath(tabName) {
        let result = `/${this.product.getAlias()}/`;

        if (this.LanguageEnum.isUa(this.language)) {
            result = `/${this.language}${result}`;
        }

        if (tabName) {
            result += `${tabName}/`;
        }

        return result;
    }

    /**
     * @private
     * @method _buildPath
     * @param [tabName] {string}
     * @returns {string}
     */
    _buildPath(tabName) {
        let result = this._buildBaseProductPath(tabName);

        if (this.TabNameEnum.isReview(tabName) && this.reviewId) {
            result += `${this.reviewId}/`;
        }

        return result;
    }

    /**
     * @private
     * @method _buildTabs
     * @returns {Array}
     */
    _buildTabs() {
        let strings = this._getStringsResource(),
            result = [
                {
                    name: this._getDefaultTabName(),
                    description: strings.allAboutProduct,
                    href: this._buildPath(),
                    contentType: this.ContentTypeEnum.getDefaultAsValue(),
                    badge: "",
                    active: false
                },
                {
                    name: this.TabNameEnum.getReviewAsValue(),
                    description: this.review.getThreads().length ? strings.reviews : strings.review.create,
                    href: this.review.getThreads().length ? this._buildPath(this.TabNameEnum.getReviewAsValue()) : "",
                    contentType: this.ContentTypeEnum.getReviewAsValue(),
                    badge: (this.review.getThreads().length && this.product.getReview().getCommentsCount()) || "",
                    active: true
                }
            ];

        if (this.analogs.length) {
            result.push({
                name: this.TabNameEnum.getAnalogsAsValue(),
                description: strings.analogsAndSubstitutes,
                href: this._buildPath(this.TabNameEnum.getAnalogsAsValue()),
                contentType: this.ContentTypeEnum.getAnalogsAsValue(),
                badge: "",
                active: false
            });
        }

        return result;
    }

    /**
     * @pubbuy-c
     * @method changeTab
     * @param tab {Object}
     * @returns {Presenter}
     */
    changeTab(tab) {
        window.location.href = this._buildPath(tab.name);

        return this;
    }

    /**
     * @public
     * @method addToBasket
     * @param product {Product}
     * @param success {Function}
     * @param error {Function}
     * @returns {Presenter}
     */
    addToBasket(product, success, error) {
        this.Model.addToBasket(product, success, error);

        return this;
    }

    /**
     * @private
     * @method _subscribeEvents
     * @returns {Presenter}
     */
    _subscribeEvents() {
        this.AuthorizationService.on("login", () => {
            this.observer.trigger("login");
        });

        return this;
    }

    /**
     * @method getProfile
     * @param success {Function}
     * @return {Presenter}
     */
    getProfile(success) {
        if (_.isFunction(success)) {
            this.Model.getProfile((profile) => {
                success(profile);
            });
        }

        return this;
    }

    /**
     * @method getReview
     * @param success {Function}
     * @param error {Function}
     * @return {Presenter}
     */
    getReview(success, error) {
        let page = 1;

        if (_.isFunction(success) && _.isFunction(error)) {
            this.Model.getReviewByPage(page, success, error);
        }

        return this;
    }

    /**
     * @public
     * @method upload
     * @param image {string}
     * @param type {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Presenter}
     */
    upload(image, type, success, error) {
        if (Boolean(image) && Boolean(type) && _.isFunction(success) && _.isFunction(error)) {
            this.Model.uploadUnpackingPhoto(image, type, success, error);
        }

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

        this.language = pageInfo.language;
        this.review = result.review;
        this.product = result.product;
        this.analogs = result.analogs;

        result.tabs = this.getTabs(result.tabName);

        return result;
    }
}

export default Presenter;
