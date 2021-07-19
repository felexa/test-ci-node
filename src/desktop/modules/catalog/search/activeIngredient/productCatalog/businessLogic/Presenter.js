/* eslint-disable max-len */
import _ from "lodash";

class Presenter {
    constructor(props) {
        /**
         * @property language
         * @type {string}
         */
        this.language = "";

        /**
         * @property currentIngredientName
         * @type {string}
         */
        this.currentIngredientName = "";

        /**
         * @property description
         * @type {string}
         */
        this.description = "";

        /**
         * @property notation
         * @type {string}
         */
        this.notation = "";

        /**
         * @property totalReviewCount
         * @type {number}
         */
        this.totalReviewCount = 0;

        /**
         * @property analogs
         * @type {Array}
         */
        this.analogs = [];

        /**
         * @property forPregnant
         * @type {Array}
         */
        this.forPregnant = [];

        /**
         * @property review
         * @type {Review}
         */
        this.review = null;

        /**
         * @property redactor
         * @type {Profile}
         */
        this.redactor = null;

        /**
         * @property priceRange
         * @type {Range}
         */
        this.priceRange = null;

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = props.dependencies.Resource;

        /**
         * @property Numbers
         * @type {Numbers}
         */
        this.Numbers = props.dependencies.Numbers;

        this.observer = new props.dependencies.Observer().installTo(this);

        this.Model = props.dependencies.Model;

        this.Env = props.dependencies.Env;
        this.Router = props.dependencies.Router;

        this.TabNameEnum = props.dependencies.TabNameEnum;
        this.ContentTypeEnum = props.dependencies.ContentTypeEnum;
        this.RouteNamesEnum = props.dependencies.RouteNamesEnum;

        this.changeRoute = this.changeRoute.bind(this);

        this._registeringCallbacks();
    }

    /**
     * @private
     * @method _hasForPregnant
     * @returns {boolean}
     */
    _hasForPregnant() {
        return Boolean(this.forPregnant && this.forPregnant.length);
    }

    /**
     * @private
     * @method _hasDescription
     * @returns {boolean}
     */
    _hasDescription() {
        return Boolean(this.description && this.description.length);
    }

    /**
     * @private
     * @method _hasNotation
     * @returns {boolean}
     */
    _hasNotation() {
        return Boolean(this.notation && this.notation.length);
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
     * @method _getPriceRangeAsText
     * @returns {string}
     */
    _getPriceRangeAsText() {
        let result = `(${this.Numbers.toLocaleString(this.priceRange.getMin())} - ${this.Numbers.toLocaleString(this.priceRange.getMax())} ГРН)`;

        return (this.priceRange.getMin() && this.priceRange.getMax() && result) || "";
    }

    /**
     * @private // todo remove
     * @method _buildTabLinkOld
     * @param [tabName] {string}
     * @returns {string}
     */
    _buildTabLinkOld(tabName = null) {
        return `${this.Env.getBitrixHost()}${this.Router.getRouteByName(this.RouteNamesEnum.getMNNAsValue()).toPath(
            _.merge({}, this._getCurrentRoute().query, {
                tabName
            })
        )}/`;
    }

    /**
     * @private
     * @method _buildTabLink
     * @param tabName {string}
     * @param ingredientName {string}
     * @returns {string}
     */
    _buildTabLink(tabName = "", ingredientName = "") {
        return `${this.Env.getBitrixHost()}/${tabName}/${ingredientName}/`;
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
                    name: this._hasDescription() ? this.TabNameEnum.getPricesAsValue() : this.TabNameEnum.getMainAsValue(),
                    description: `${strings.prices} ${this._getPriceRangeAsText()}`.trim(),
                    href: this._buildTabLinkOld(this._hasDescription() ? this.TabNameEnum.getPricesAsValue() : null),
                    contentType: this.ContentTypeEnum.getPricesAsValue(),
                    badge: "",
                    active: true
                },
                {
                    name: this.TabNameEnum.getInstructionAsValue(),
                    description: strings.instruction,
                    href: this._buildTabLinkOld(this.TabNameEnum.getInstructionAsValue()),
                    contentType: this.ContentTypeEnum.getInstructionAsValue(),
                    badge: "",
                    active: false
                }
            ];

        if (this._hasDescription()) {
            result.unshift({
                name: this.TabNameEnum.getMainAsValue(),
                description: strings.description,
                href: this._buildTabLinkOld(),
                contentType: this.ContentTypeEnum.getDescriptionAsValue(),
                badge: "",
                active: false
            });
        }

        if (this.analogs.length) {
            result.push({
                name: this.TabNameEnum.getAnalogsAsValue(),
                description: strings.analogs,
                href: this._buildTabLinkOld(this.TabNameEnum.getAnalogsAsValue()),
                contentType: this.ContentTypeEnum.getAnalogsAsValue(),
                badge: "",
                active: false
            });
        }

        if (this.review.getThreads().length) {
            result.push({
                name: this.TabNameEnum.getReviewAsValue(),
                description: strings.reviews,
                href: this._buildTabLinkOld(this.TabNameEnum.getReviewAsValue()),
                contentType: this.ContentTypeEnum.getReviewAsValue(),
                badge: this.totalReviewCount,
                active: false
            });
        }

        if (this._hasNotation()) {
            result.push({
                name: this.TabNameEnum.getNotationAsValue(),
                description: strings.recommendations,
                href: this._buildTabLinkOld(this.TabNameEnum.getNotationAsValue()),
                contentType: this.ContentTypeEnum.getNotationAsValue(),
                badge: "",
                active: false
            });
        }

        if (this._hasForPregnant()) {
            result.push({
                name: this.TabNameEnum.getPregnancyAsValue(),
                description: strings.forPregnantAndBreastFeeders,
                href: this._buildTabLink(this.TabNameEnum.getPregnancyAsValue(), this.currentIngredientName),
                contentType: this.ContentTypeEnum.getPregnancyAsValue(),
                badge: "",
                active: false
            });
        }

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
     * @method _getCurrentRoute
     * @returns {{query: Object, pathname: string}}
     * @private
     */
    _getCurrentRoute() {
        let route = this.Router.getCurrentRoute();

        return route.pathname ? route : this.Model.getCurrentRouteFromServer();
    }

    /**
     * @private
     * @method changeRoute
     * @param tabName {string}
     * @returns {Presenter}
     */
    changeRoute(tabName) {
        if (tabName === this.TabNameEnum.getPregnancyAsValue()) { // todo???
            this.Router.to(`/${this.TabNameEnum.getPregnancyAsValue()}/${this.currentIngredientName}/`, {shallow: true});
        } else {
            this.Router.toByName(this.RouteNamesEnum.getMNNAsValue(), {tabName: tabName || null}, {shallow: true});
        }

        return this;
    }

    /**
     * @private
     * @method _registeringCallbacks
     * @return {Presenter}
     */
    _registeringCallbacks() {
        // this.Router.on("routeChangeComplete", (...args) => {
        //     this.observer.trigger("changeRoute", ...args);
        // });

        return this;
    }

    /**
     * @public
     * @method getTabs
     * @param [currentTabName] {string}
     * @returns {Array}
     */
    getTabs(currentTabName = this.TabNameEnum.getMainAsValue()) {
        return this._setActiveTabByName(this._buildTabs(), currentTabName);
    }

    /**
     * @public
     * @method getInstructionById
     * @param id {string|number}
     * @param callback {Function}
     * @returns {Presenter}
     */
    getInstructionById(id, callback) {
        if (id && _.isFunction(callback)) {
            this.Model.getInstructionById(
                id,
                callback,
                () => {
                    callback("");
                }
            );
        }

        return this;
    }

    /**
     * @public
     * @method getReviewByPage
     * @param page {number}
     * @param success {Function}
     * @param error {Function}
     * @returns {Presenter}
     */
    getReviewByPage(page, success, error) {
        this.Model.getReviewByPage(page, success, error);

        return this;
    }

    /**
     * @public
     * @method getViewedProducts
     * @param callback {Function}
     * @return {Home}
     */
    getViewedProducts(callback) {
        this.Model.getViewedProducts((rubric) => {
            callback([rubric]);
        }, () => {
            callback([]);
        });

        return this;
    }

    /**
     * @public
     * @method changeTab
     * @param tab {Object}
     * @returns {Presenter}
     */
    changeTab(tab) {
        this.observer.trigger("changeTab", this.getTabs(tab.name));

        this.changeRoute(tab.name);

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
     * @method normalizeInitialProps
     * @param initialData
     * @param pageInfo
     * @returns {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        let result = this.Model.normalizeInitialProps(initialData, pageInfo);

        this.language = result.pageInfo.getLanguage();
        this.priceRange = result.priceRange;
        this.description = result.description;
        this.notation = result.notation;
        this.currentIngredientName = result.ingredient;
        this.review = result.review;
        this.analogs = result.analogs;
        this.forPregnant = result.forPregnant;
        this.redactor = result.redactor;
        this.totalReviewCount = result.totalReviewCount;

        result.tabs = this.getTabs(result.tabName);

        return result;
    }
}

export default Presenter;
