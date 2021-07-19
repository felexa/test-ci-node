/*eslint-disable no-extra-boolean-cast*/
import _ from "lodash";
import Resource from "app/core/resource";

class EntityTransformer {
    constructor(searchResults) {
        this.Resource = Resource;

        this.searchResults = _.cloneDeep(searchResults || {});
    }

    /**
     * @private
     * @method _tranformPrice
     * @return {void}
     */
    _tranformPrice() {
        this.searchResults.prices = {
            base_prices: {
                min: _.get(this.searchResults, "prices.base_prices.price_from") || 0,
                max: _.get(this.searchResults, "prices.base_prices.price_to") || 0
            },
            selected_prices: {
                min: _.get(this.searchResults, "prices.selected_prices.price_from") || 0,
                max: _.get(this.searchResults, "prices.selected_prices.price_to") || 0,
                api: _.get(this.searchResults, "prices.selected_prices.price_from_url.removed_api_url") || ""
            },
            filtered_prices: {
                min: _.get(this.searchResults, "prices.filtered_prices.price_from") || 0,
                max: _.get(this.searchResults, "prices.filtered_prices.price_to") || 0
            }
        };
    }

    /**
     * @private
     * @method _combineAttributes
     * @return {void}
     */
    _combineAttributes() {
        // let sellersData = this.searchResults.sellers ? this.searchResults.sellers : [],
        //     sellers = {
        //         alias: "seller",
        //         name: this.Resource.strings.seller,
        //         values: [...sellersData]
        //     },
        let activeIngredientsData = this.searchResults.active_ingredients ? this.searchResults.active_ingredients : [],
            activeIngredients = {
                alias: "active_ingredient",
                name: this.Resource.strings.activeIngredient,
                values: [...activeIngredientsData]
            };

        if (Boolean(this.searchResults.attributes) && Boolean(this.searchResults.attributes.length)) {
            if (Boolean(activeIngredients.values.length)) {
                this.searchResults.attributes = [...this.searchResults.attributes, activeIngredients];
            } else {
                this.searchResults.attributes = [...this.searchResults.attributes];
            }
        }
    }

    /**
     * @private
     * @method _tranformSearchPhrase
     * @return {void}
     */
    _supplementSearchPhrase() {
        this.searchResults.searchPhrase = _.get(this.searchResults, "category.name") || "";
    }

    /**
     * @public
     * @method getFilterValue
     * @return {Object}
     */
    getFilterValue() {
        this._tranformPrice();
        this._combineAttributes();
        this._supplementSearchPhrase();

        return this.searchResults;
    }
}

export default EntityTransformer;
