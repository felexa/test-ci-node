import Entity from "app/core/entities/Entity";
import Share from "app/core/entities/share/Share";
import Price from "app/core/entities/price/Price";
import Seller from "app/core/entities/seller/Seller";
import Image from "app/core/entities/image/Image";
import Status from "app/core/entities/status/Status";
import Brand from "app/core/entities/brand/Brand";

class Offer extends Entity {
    /**
     * @method getUrl
     * @returns {string}
     */
    getUrl() {
        return this.entity.url || "";
    }

    /**
     * @public
     * @method getCode
     * @returns {string}
     */
    getCode() {
        return this.entity.sku || "";
    }

    /**
     * @public
     * @method getCountryOfProduction
     * @returns {string}
     */
    getCountryOfProduction() {
        return this.entity.countryOfProduction || "";
    }

    /**
     * @method getName
     * @returns {string}
     */
    getName() {
        return this.entity.name || "";
    }

    /**
     * @method getSeller
     * @return {Seller}
     */
    getSeller() {
        return new Seller(this.entity.seller);
    }

    /**
     * @method getBrand
     * @return {Brand}
     */
    getBrand() {
        return new Brand(this.entity.brand);
    }

    /**
     * @method getShare
     * @returns {Share}
     */
    getShare() {
        return new Share(this.entity.dial);
    }

    /**
     * @method getPrice
     * @returns {Price}
     */
    getPrice() {
        return new Price(this.entity.price);
    }

    /**
     * @method getLogo
     * @returns {Image}
     */
    getPreview() {
        return new Image(this.entity.preview);
    }

    /**
     * @public
     * @method getStatus
     * @returns {{getType(): string, getId(): string, getName(): string}}
     */
    getStatus() {
        return new Status(this.entity);
    }
}

export default Offer;
