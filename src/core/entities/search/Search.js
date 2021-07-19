import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";
import Category from "app/core/entities/category/Category";

class Search extends Entity {
    /**
     * @method getSearchPhrase
     * @returns {string}
     */
    getSearchPhrase() {
        return this.entity.searchPhrase || "";
    }

    /**
     * @method getName
     * @returns {string}
     */
    getSuggests() {
        return this.entity.suggests || [];
    }

    /**
     * @method getSearchItems
     * @return {Array}
     */
    getSearchItems() {
        return (this.entity.searchItems || []).map((item) => ({
            /**
            * @method getId
            * @returns {string}
            */
            getId() {
                return item.id || "";
            },
            /**
            * @method getAlias
            * @returns {string}
            */
            getAlias() {
                return item.alias || "";
            },
            /**
            * @method getOldprice
            * @returns {number}
            */
            getOldprice() {
                return Number(item.oldprice) || 0;
            },
            /**
            * @method getPrice
            * @returns {number}
            */
            getPrice() {
                return Number(item.price) || 0;
            },
            /**
            * @method getTitle
            * @returns {string}
            */
            getTitle() {
                return item.title || "";
            },
            /**
            * @method getUrl
            * @returns {string}
            */
            getUrl() {
                return item.url || "";
            },

            /**
            * @method getPreview
            * @returns {Image}
            */
            getPreview() {
                return new Image(item.preview);
            }
        }));
    }

    /**
     * @method getCategories
     * @returns {Array}
     */
    getCategories() {
        return (this.entity.categories || []).map((item) => new Category(item));
    }
}

export default Search;
