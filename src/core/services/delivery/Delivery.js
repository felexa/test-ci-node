import _ from "lodash";

class Delivery {
    constructor(props) {
        /**
         * @property Repository
         * @type {Repository}
         */
        this.Repository = props.dependencies.Repository;

        /**
         * @property CityEntity
         * @type {City}
         */
        this.CityEntity = props.dependencies.CityEntity;

        /**
         * @property DeliveryEntity
         * @type {City}
         */
        this.DeliveryEntity = props.dependencies.DeliveryEntity;
    }

    /**
     * @method getPopularCities
     * @param success {Function}
     * @param error {Function}
     * @returns {Repository}
     */
    getPopularCities(success, error) {
        if (_.isFunction(success) && _.isFunction(error)) {
            this.Repository.getPopularCities((items) => {
                success(items.map((item) => new this.CityEntity(item)));
            }, error);
        }

        return this;
    }

    /**
     * @method getCitiesByName
     * @param name {string}
     * @param success {Function}
     * @param error {Function}
     * @returns {Delivery}
     */
    getCitiesByName(name, success, error) {
        if (_.isString(name) && _.isFunction(success) && _.isFunction(error)) {
            this.Repository.getCitiesByName(name, (items) => {
                success(
                    items
                        .filter((item) => (item.name.toLowerCase().includes(name.toLowerCase())))
                        .map((item) => new this.CityEntity(item))
                );
            }, error);
        }

        return this;
    }

    /**
     * @method getDeliveriesByProduct
     * @param cityId {string|number}
     * @param productAlias {string}
     * @param success {Function}
     * @param error {Function}
     * @return {Delivery}
     */
    getDeliveriesByProduct(cityId, productAlias, success, error) {
        if (cityId && productAlias && _.isFunction(success) && _.isFunction(error)) {
            this.Repository.getDeliveriesByProduct(cityId, productAlias, (items) => {
                success(
                    items.map((item) => new this.DeliveryEntity({
                        id: item.delivery_id,
                        title: item.delivery_name,
                        description: item.delivery_description,
                        logo: {
                            src: {
                                original: item.delivery_logo
                            }
                        },
                        price: item.delivery_price
                    }))
                );
            }, error);
        }

        return this;
    }

    /**
     * @public
     * @method convertCityToEntity
     * @param city {Object}
     * @returns {City}
     */
    convertCityToEntity(city) {
        return new this.CityEntity(city);
    }
}

export default Delivery;
