/* eslint-disable max-len */
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

        this.Resource = props.dependencies.Resource;
        this.Model = props.dependencies.Model;
        this.AuthorizationService = props.dependencies.AuthorizationService;
        this.Router = props.dependencies.Router;
        this.Analytics = props.dependencies.Analytics;

        this.LanguageEnum = props.dependencies.LanguageEnum;
        this.TabNameEnum = props.dependencies.TabNameEnum;
        this.ContentTypeEnum = props.dependencies.ContentTypeEnum;
        this.RouteNamesEnum = props.dependencies.RouteNamesEnum;
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
     * @method getTabs
     * @param [currentTabName] {string}
     * @returns {Array}
     */
    getTabs() {
        let result = this._buildTabs();

        this._setActiveTabByName(
            result,
            "analogs"
        );

        return result;
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
                    active: false
                }
            ];

        if (this.analogs.length) {
            result.push({
                name: this.TabNameEnum.getAnalogsAsValue(),
                description: strings.analogsAndSubstitutes,
                href: this._buildPath(this.TabNameEnum.getAnalogsAsValue()),
                contentType: this.ContentTypeEnum.getAnalogsAsValue(),
                badge: "",
                active: true
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
