import _ from "lodash";
import SearchEntity from "app/core/entities/search/Search";

class Search {
    constructor(props) {
        /**
         * @property Repository
         * @type {Repository}
         */
        this.Repository = props.dependencies.Repository;

        /**
         * @property SearchEntity
         * @type {Search}
         */
        this.SearchEntity = SearchEntity;
    }

    /**
     * @public
     * @method getItemsByQuery
     * @param query {string}
     * @param success {Function}
     * @param error {Function}
     * @return {Search}
     */
    getItemsByQuery(query, success, error) {
        if (query && _.isFunction(success) && _.isFunction(error)) {
            this.Repository.getItemsByQuery(query.trim().toLowerCase(), success, error);
        }

        return this;
    }

    /**
     * @public
     * @method getItemsByQueryAutocomplete
     * @param query {string}
     * @param success {Function}
     * @param error {Function}
     * @return {Search}
     */
    getItemsByQueryAutocomplete(query, success, error) {
        if (query && _.isFunction(success) && _.isFunction(error)) {
            this.Repository.getItemsByQueryAutocomplete(query.trim().toLowerCase(), success, error);
        }

        return this;
    }

    /**
     * @public
     * @method convertSearchResultToEntity
     * @param searchResults {Object}
     * @returns {Search}
     */
    convertSearchResultToEntity(searchResults) {
        return new this.SearchEntity(searchResults);
    }
}

export default Search;
