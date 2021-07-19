import _ from "lodash";

import MassMediaFixture from "desktop/modules/homePage/businessLogic/fixture/massMedia.json";
import BrandsFixture from "desktop/modules/homePage/businessLogic/fixture/brands.json";
import ReviewFromDoctors from "desktop/modules/homePage/businessLogic/fixture/reviewFromDoctors.json";
import ReviewsLatest from "desktop/modules/homePage/businessLogic/fixture/reviewsLatest.json";

class Repository {
    constructor(props) {
        /**
         * @example
         *
         * urls = {
         *     getProduct: {
         *         domain: string,
         *         path: string
         *     }
         * }
         *
         * @property urls
         * @type {Object}
         */
        this.urls = props.urls;

        this.brands = BrandsFixture;
        this.massMedia = MassMediaFixture;
        this.reviewFromDoctors = ReviewFromDoctors;
        this.reviewsLatest = ReviewsLatest;

        this.rubricsId = {
            relatedProducts: "relatedProducts",
            reviews: "reviews",
            shareProducts: "shareProducts",
            popularProducts: "popularProducts",
            viewedProducts: "viewedProducts",
            lastArticles: "lastArticles",
            brands: "brands",
            massMedia: "massMedia",
            reviewFromDoctors: "reviewFromDoctors"
        };

        this.httpClient = new props.dependencies.HttpClient();

        this.HttpClient = props.dependencies.HttpClient;
        this.Env = props.dependencies.Env;

        this.Resource = props.dependencies.Resource;

        this.ViewedProductsService = props.dependencies.ViewedProductsService;

        this.IconNameEnum = props.dependencies.IconNameEnum;
    }

    /**
     * @private
     * @method _getIconId
     * @param rubricId
     * @returns {string}
     */
    _getIconId(rubricId) {
        return this.IconNameEnum.getValueByKey(rubricId);
    }

    /**
     * @method _getStringsResource
     * @returns {Object}
     * @private
     */
    _getStringsResource() {
        return this.Resource.getStrings(this.Env.getLanguage());
    }

    /**
     * @public
     * @method getRelatedProducts
     * @param id {string|number}
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getRelatedProducts(id, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getRelatedProducts.domain)
            .request({
                path: this.urls.getRelatedProducts.path,
                method: this.HttpClient.methods.GET,
                params: {id},
                query: this.urls.getRelatedProducts.query
            })
            .then((response) => {
                success({
                    id: this.rubricsId.relatedProducts,
                    name: this._getStringsResource().youMayAlsoBeInterestedIn,
                    items: response.data,
                    iconId: this._getIconId(this.rubricsId.shareProducts)
                });
            }, error);
    }

    /**
     * @public
     * @method getPopularProducts
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getPopularProducts(success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getPopularProducts.domain)
            .request({
                path: this.urls.getPopularProducts.path,
                method: this.HttpClient.methods.GET,
                query: this.urls.getPopularProducts.query
            })
            .then((response) => {
                success({
                    id: 1,
                    name: this._getStringsResource().bestsellers,
                    items: response.data,
                    iconId: this._getIconId(this.rubricsId.popularProducts)
                });
            }, error);
    }

    /**
     * @public
     * @method getPopularDrugs
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getPopularDrugs(success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getPopularDrugs.domain)
            .request({
                path: this.urls.getPopularDrugs.path,
                method: this.HttpClient.methods.GET
            })
            .then((response) => {
                success({
                    id: 1,
                    name: this._getStringsResource().popularProducts,
                    items: response.data,
                    iconId: ""
                });
            }, error);
    }

    /**
     * @public
     * @method getVitaminsAndMinerals
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getVitaminsAndMinerals(success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getVitaminsAndMinerals.domain)
            .request({
                path: this.urls.getVitaminsAndMinerals.path,
                method: this.HttpClient.methods.GET,
                query: this.urls.getVitaminsAndMinerals.query
            })
            .then((response) => {
                success({
                    id: 2,
                    name: this._getStringsResource().vitaminsAndMinerals,
                    items: response.data,
                    iconId: ""
                });
            }, error);
    }

    /**
     * @public
     * @method getAntibiotics
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getAntibiotics(success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getAntibiotics.domain)
            .request({
                path: this.urls.getAntibiotics.path,
                method: this.HttpClient.methods.GET,
                query: this.urls.getAntibiotics.query
            })
            .then((response) => {
                success({
                    id: 3,
                    name: this._getStringsResource().antibiotics,
                    items: response.data,
                    iconId: ""
                });
            }, error);
    }

    /**
     * @public
     * @method getGynecologicalDrugs
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getGynecologicalDrugs(success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getGynecologicalDrugs.domain)
            .request({
                path: this.urls.getGynecologicalDrugs.path,
                method: this.HttpClient.methods.GET,
                query: this.urls.getGynecologicalDrugs.query
            })
            .then((response) => {
                success({
                    id: 4,
                    name: this._getStringsResource().gynecologicalPreparations,
                    items: response.data,
                    iconId: ""
                });
            }, error);
    }

    /**
     * @public
     * @method getUrologicalDrugs
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getUrologicalDrugs(success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getUrologicalDrugs.domain)
            .request({
                path: this.urls.getUrologicalDrugs.path,
                method: this.HttpClient.methods.GET,
                query: this.urls.getUrologicalDrugs.query
            })
            .then((response) => {
                success({
                    id: 5,
                    name: this._getStringsResource().urologicalPreparations,
                    items: response.data,
                    iconId: ""
                });
            }, error);
    }

    /**
     * @public
     * @method getShareProducts
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getShareProducts(success, error) {
        let allSharesUrl = `${this.Env.getBitrixHost()}/promo/aktsiya-na-ves-assortiment-johnson-johnson/`;

        return this.httpClient
            .setBaseUrl(this.urls.getShareProducts.domain)
            .request({
                path: this.urls.getShareProducts.path,
                method: this.HttpClient.methods.GET,
                query: this.urls.getShareProducts.query
            })
            .then((response) => {
                success({
                    id: 2,
                    name: this._getStringsResource().attentionToThisItems,
                    url: allSharesUrl,
                    items: response.data,
                    iconId: this._getIconId(this.rubricsId.shareProducts)
                });
            }, error);
    }

    /**
     * @public
     * @method getPopularProductsJohnson
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getPopularProductsJohnson(success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getPopularProductsJohnson.domain)
            .request({
                path: this.urls.getPopularProductsJohnson.path,
                method: this.HttpClient.methods.GET,
                query: this.urls.getPopularProductsJohnson.query
            })
            .then((response) => {
                success({
                    id: 3,
                    name: this._getStringsResource().popularProducts,
                    items: response.data,
                    iconId: this._getIconId(this.rubricsId.popularProducts)
                });
            }, error);
    }

    /**
     * @public
     * @method getAllProductsJohnson
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getAllProductsJohnson(success, error) {
        // let allSharesUrl = `${this.Env.getBitrixHost()}/promo/aktsiya-na-ves-assortiment-johnson-johnson/`;
        return this.httpClient
            .setBaseUrl(this.urls.getAllProductsJohnson.domain)
            .request({
                path: this.urls.getAllProductsJohnson.path,
                method: this.HttpClient.methods.GET,
                query: this.urls.getAllProductsJohnson.query
            })
            .then((response) => {
                success({
                    id: 4,
                    name: "Все товары компании ООО «Джонсон и Джонсон Украина»",
                    // url: allSharesUrl,
                    items: response.data,
                    iconId: this._getIconId(this.rubricsId.shareProducts)
                });
            }, error);
    }

    /**
     * @public
     * @method getPromoProducts
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getPromoProducts(success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getPromoProducts.domain)
            .request({
                path: this.urls.getPromoProducts.path,
                method: this.HttpClient.methods.GET,
                query: this.urls.getPromoProducts.query
            })
            .then((response) => {
                success({
                    id: 271,
                    name: "Товары акции",
                    items: response.data
                });
            }, error);
    }

    /**
     * @public
     * @method getViewedProducts
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getViewedProducts(success, error) {
        let viewedProductsId = this.ViewedProductsService.getProductsId(),
            rubric = {
                id: "viewed-products",
                name: this._getStringsResource().viewedProducts,
                items: [],
                iconId: this._getIconId(this.rubricsId.viewedProducts)
            },
            promise = Promise.resolve(rubric);

        if (viewedProductsId.length) {
            promise = this.httpClient
                .setBaseUrl(this.urls.getViewedProducts.domain)
                .request({
                    path: this.urls.getViewedProducts.path,
                    method: this.HttpClient.methods.GET,
                    query: {
                        id: viewedProductsId,
                        itemsPerPage: viewedProductsId.length
                    }
                })
                .then((response) => {
                    rubric.items = _.sortBy(response.data, (product) => viewedProductsId.indexOf(product.id));

                    success(rubric);
                }, error);
        }

        return promise;
    }

    /**
     * @public
     * @method getLastReviewAsRubric
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getLastReview(success, /*error*/) {
        /* eslint-disable quote-props */
        let items = this.reviewsLatest;
        /* eslint-enable quote-props */

        return new Promise((resolve) => {
            resolve(success({
                id: 1,
                name: this._getStringsResource().lastReviews,
                items,
                iconId: this._getIconId(this.rubricsId.reviews)
            }));
        });

        // return this.httpClient
        //     .setBaseUrl(this.urls.getLatestReview.domain)
        //     .request({
        //         path: this.urls.getLatestReview.path,
        //         method: this.HttpClient.methods.GET
        //     })
        //     .then((response) => {
        //         success({
        //             id: 1,
        //             name: "Последние отзывы",
        //             items: response.data,
        //             iconId: this._getIconId(this.rubricsId.reviews)
        //         });
        //     }, error);
    }

    /**
     * @public
     * @method getReviewFromDoctors
     * @param success {Function}
     * @return {Promise}
     */
    getReviewFromDoctors(success) {
        let result = {
            id: 1,
            name: this._getStringsResource().doctorsAboutTheService,
            items: _.merge([], this.reviewFromDoctors),
            iconId: this._getIconId(this.rubricsId.reviewFromDoctors)
        };

        return new Promise((resolve) => {
            resolve(result);
            success(result);
        });
    }

    /**
     * @public
     * @method getArticles
     * @param params {{
     *     itemsPerPage: number,
     *     page: number
     * }}
     * @param success {Function}
     * @param error {Function}
     * @return {Promise}
     */
    getArticles(params, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getArticles.domain)
            .request({
                path: this.urls.getArticles.path,
                method: this.HttpClient.methods.GET,
                query: _.merge({}, this.urls.getArticles.query, {
                    itemsPerPage: params.itemsPerPage,
                    page: params.page
                })
            })
            .then((response) => {
                success({
                    id: this.rubricsId.lastArticles,
                    name: this._getStringsResource().blog,
                    iconId: this._getIconId(this.rubricsId.lastArticles),
                    items: response.data.items
                });
            }, error);
    }

    /**
     * @method getArticlesByIngredientName
     * @param params {{
     *   ingredientName: string,
     *   itemsPerPage: number
     * }}
     * @param success {Function}
     * @param error {Function}
     * @returns {Promise}
     */
    getArticlesByIngredientName(params, success, error) {
        return this.httpClient
            .setBaseUrl(this.urls.getArticles.domain)
            .request({
                path: this.urls.getArticles.path,
                method: this.HttpClient.methods.GET,
                query: _.merge({}, this.urls.getArticles.query, {
                    itemsPerPage: params.itemsPerPage,
                    "marketedNames.alias": params.ingredientName
                })
            })
            .then((response) => {
                success({
                    id: this.rubricsId.lastArticles,
                    name: this._getStringsResource().usefulArticles,
                    iconId: this._getIconId(this.rubricsId.lastArticles),
                    items: response.data.items
                });
            }, error);
    }

    /**
     * @public
     * @method getBrands
     * @param success {Function}
     * @return {Promise}
     */
    getBrands(success) {
        let result = {
            id: this.rubricsId.brands,
            name: this._getStringsResource().popularBrands,
            items: this.brands,
            iconId: this._getIconId(this.rubricsId.brands)
        };

        return new Promise((resolve) => {
            resolve(result);
            success(result);
        });
    }

    /**
     * @public
     * @method getMassMedia
     * @param success {Function}
     * @return {Promise}
     */
    getMassMedia(success) {
        let result = {
            name: this._getStringsResource().massMediaAboutUs,
            items: this.massMedia,
            iconId: this._getIconId(this.rubricsId.massMedia)
        };

        return new Promise((resolve) => {
            resolve(result);
            success(result);
        });
    }
}

export default Repository;
