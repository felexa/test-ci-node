import _ from "lodash";

class SearchToCatalogAdapter {
    constructor(searchResults) {
        this.searchResults = _.cloneDeep(searchResults || {});
    }

    /**
     * @privat
     * @method _tranformPrice
     * @return {void}
     */
    _tranformPrice() {
        this.searchResults.prices = {
            base_prices: {
                min: _.get(this.searchResults, "price.minPrice") || 0,
                max: _.get(this.searchResults, "price.maxPrice") || 0
            },
            selected_prices: {
                min: _.get(this.searchResults, "price.minPrice") || 0,
                max: _.get(this.searchResults, "price.maxPrice") || 0
            },
            filtered_prices: {
                min: _.get(this.searchResults, "price.minPrice") || 0,
                max: _.get(this.searchResults, "price.maxPrice") || 0
            }
        };
    }

    /**
     * @privat
     * @method _tranformPage
     * @return {void}
     */
    _tranformPage() {
        this.searchResults.page = {
            page: _.get(this.searchResults, "paginationData.page") || 0,
            count: _.get(this.searchResults, "paginationData.perPage") || 0,
            total_count: _.get(this.searchResults, "paginationData.total") || 0
        };
    }

    /**
     * @privat
     * @method _tranformCategory
     * @return {void}
     */
    _tranformCategory() {
        this.searchResults.catalog_categories = this.searchResults.categories || [];
    }

    /**
     * @public
     * @method getFilterValue
     * @return {Object}
     */
    getFilterValue() {
        this._tranformPrice();
        this._tranformCategory();
        this._tranformPage();

        return this.searchResults;
    }
}

export default SearchToCatalogAdapter;
