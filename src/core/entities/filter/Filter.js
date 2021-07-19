import _ from "lodash";
import Entity from "app/core/entities/Entity";
import Product from "app/core/entities/product/Product";
import Category from "app/core/entities/category/Category";
import Attribute from "app/core/entities/attribute/Attribute";
import Sort from "app/core/entities/sort/Sort";
import Range from "app/core/entities/range/Range";

class Filter extends Entity {
    /**
     * @public
     * @method getTitle
     * @returns {string}
     */
    getTitle() {
        return _.get(this.entity, "seo.h1") || "";
    }

    /**
     * @public
     * @method getQuery
     * @returns {string}
     */
    getQuery() {
        return this.entity.searchPhrase || "";
    }

    /**
     * @public
     * @method getSuggests
     * @returns {string}
     */
    getSuggests() {
        return this.entity.suggests || [];
    }

    /**
     * @public
     * @method getUrl
     * @returns {string}
     */
    getUrl() {
        return this.entity.url || "";
    }

    /**
     * @public
     * @method getUrl
     * @returns {string}
     */
    getApiUrl() {
        return this.entity.api || "";
    }

    /**
     * @public
     * @method getPrices
     */
    getPrices() {
        let prices = this.entity.prices || {};

        return {
            /**
             * @method getApiUrl
             * @return {string}
             */
            getApiUrl() {
                return _.get(prices, "selected_prices.api") || "";
            },
            /**
             * @method getRange
             * @return {Range}
             */
            getRange() {
                return new Range(prices.base_prices);
            },
            /**
             * @method getSelectedRange
             * @return {Range}
             */
            getSelectedRange() {
                return new Range(prices.selected_prices);
            }
        };
    }

    /**
     * @public
     * @method getPagination
     */
    getPagination() {
        let pagination = this.entity.page || {};

        return {
            /**
             * @method getCurrentPage
             * @return {number}
             */
            getCurrentPage() {
                return pagination.page || 0;
            },

            /**
             * @method getPageCount
             * @return {number}
             */
            getPageCount() {
                return pagination.count || 0;
            },

            /**
             * @method getPageCount
             * @return {number}
             */
            getTotalItemsCount() {
                return pagination.total_count || 0;
            },

            /**
             * @method getApiUrl
             * @return {string}
             */
            getApiUrl() {
                return _.get(pagination, "page_url.selected_api_url") || "";
            },

            /**
             * @method hasShowMore
             * @return {boolean}
             */
            hasShowMore() {
                return Boolean(pagination.next_page);
            },

            /**
             * @method getShowMoreApi
             * @return {string}
             */
            getShowMoreApi() {
                return _.get(pagination, "next_page.api") || "";
            },

            /**
             * @method getShowMoreCount
             * @return {number}
             */
            getShowMoreCount() {
                return _.get(pagination, "next_page.count") || 0;
            }
        };
    }

    /**
     * @public
     * @method getProducts
     * @returns {Product[]}
     */
    getProducts() {
        return (this.entity.products || []).map((item) => new Product(item));
    }

    /**
     * @public
     * @method getAttributes
     * @returns {Attribute[]}
     */
    getAttributes() {
        return (this.entity.attributes || []).map((item) => new Attribute(item));
    }

    /**
     * @public
     * @method getSort
     * @returns {Sorting[]}
     */
    getSort() {
        return (this.entity.sorting || []).map((item) => new Sort(item));
    }

    /**
     * @public
     * @method getCategories
     * @returns {Category[]}
     */
    getCategories() {
        return (this.entity.catalog_categories || []).map((item) => new Category(item));
    }

    /**
     * @public
     * @method getSuggestion
     * @returns {string}
     */
    getSuggestion() {
        return _.get(this.entity, "suggestion.title") || "";
    }

    /**
     * @public
     * @method getSelectedFilters
     */
    getSelectedFilters() {
        return (this.entity.selected_filters || []).map((item) => ({
            /**
             * @method getUrl
             * @return {string}
             */
            getUrl() {
                return item.url || "";
            },

            /**
             * @method getApi
             * @return {string}
             */
            getApi() {
                return item.api || "";
            },

            /**
             * @method getName
             * @return {string}
             */
            getName() {
                return item.name || "";
            },

            /**
             * @method getValue
             * @return {string}
             */
            getValue() {
                return item.value || "";
            }
        }));
    }

    /**
     * @public
     * @method getSuggestion
     * @returns {string}
     */
    getChosenCategory() {
        return _.get(this.entity, "category.name") || "";
    }

    /**
     * @public
     * @method getSuggestion
     * @returns {string}
     */
    getBaseCategory() {
        return _.get(this.entity, "category.url") || "";
    }
}

export default Filter;
