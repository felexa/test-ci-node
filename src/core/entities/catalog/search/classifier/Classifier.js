import _ from "lodash";

import Entity from "app/core/entities/Entity";
import ProductGroup from "app/core/entities/catalog/productGroup/ProductGroup";

class Classifier extends Entity {
    /**
     * @public
     * @method getName
     * @returns {string}
     */
    getName() {
        return this.entity.name || "";
    }

    /**
     * @public
     * @method getTitle
     * @returns {string}
     */
    getTitle() {
        return this.entity.title || "";
    }

    /**
     * @public
     * @method getAlias
     * @returns {string}
     */
    getAlias() {
        return this.entity.alias || "";
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
     * @method getItemsCount
     * @returns {number}
     */
    getItemsCount() {
        return Number(this.entity.itemsCount) || 0;
    }

    /**
     * @public
     * @method getDirectory
     * @returns {Array}
     */
    getDirectory() {
        let entity = this.entity;

        return (entity.index || []).map(function (item) {
            return {
                /**
                 * @method getName
                 * @returns {string}
                 */
                getName() {
                    return item.name || "";
                },
                /**
                 * @method getTitle
                 * @returns {string}
                 */
                getTitle() {
                    return item.title || "";
                },
                /**
                 * @method getAlias
                 * @returns {string}
                 */
                getAlias() {
                    return item.alias || "";
                },
                /**
                 * @method getItemsCount
                 * @returns {number}
                 */
                getItemsCount() {
                    return Number(item.itemsCount) || 0;
                },
                /**
                 * @method getUrl
                 * @returns {*|string}
                 */
                getUrl() {
                    return item.url || "";
                }
            };
        });
    }

    /**
     * @method getItems
     * @returns {Array}
     */
    getItems() {
        let entity = this.entity;

        return (entity.items || []).map((item) => new ProductGroup(item));
    }

    /**
     * @method setItems
     * @returns {Classifier}
     */
    setItems(items) {
        if (Array.isArray(items)) {
            this.entity.items = _.merge([], items);
        }

        return this;
    }
}

export default Classifier;
