import _ from "lodash";
import company from "./fixture/company";
import banner from "./fixture/banner";
import vendorAdvantages from "./fixture/advantagesOfVendor";
import productAdvantages from "./fixture/advantageProduct";
import mainProduct from "./fixture/mainProduct";
import categories from "./fixture/categories";
import trademarks from "./fixture/trademarks";

class Repository {
    constructor() {
        this.company = this.transformerCompany(company);
        this.banner = banner;
        this.vendorAdvantages = vendorAdvantages;
        this.productAdvantages = productAdvantages;
        this.mainProduct = mainProduct;
        this.categories = categories;
        this.trademarks = trademarks;
    }

    /**
     * @public
     * @method getCompany
     * @param success
     * @returns {Promise}
     */
    getCompany(success) {
        success(this.company);

        return Promise.resolve(this.company);
    }

    /**
     * @public
     * @method getBanner
     * @param success
     * @returns {Promise}
     */
    getBanner(success) {
        success(this.banner);

        return Promise.resolve(this.banner);
    }

    /**
     * @public
     * @method getVendorAdvantages
     * @param success
     * @returns {Promise}
     */
    getVendorAdvantages(success) {
        success(this.vendorAdvantages);

        return Promise.resolve(this.vendorAdvantages);
    }

    /**
     * @public
     * @method getMainProduct
     * @param success
     * @returns {Promise}
     */
    getMainProduct(success) {
        success(this.mainProduct);

        return Promise.resolve(this.mainProduct);
    }

    /**
     * @public
     * @method getProductAdvantages
     * @param success
     * @returns {Promise}
     */
    getProductAdvantages(success) {
        success(this.productAdvantages);

        return Promise.resolve(this.productAdvantages);
    }

    /**
     * @public
     * @method getCategories
     * @param success
     * @returns {Promise}
     */
    getCategories(success) {
        success(this.categories);

        return Promise.resolve(this.categories);
    }

    /**
     * @public
     * @method getBrands
     * @param success
     * @returns {Promise}
     */
    getTrademarks(success) {
        success(this.trademarks);

        return Promise.resolve(this.trademarks);
    }

    /**
     * @private
     * @method transformerCompany
     * @param companyFixture
     * @returns {companyFixture}
     */
    transformerCompany(companyFixture) {
        let newComapny = _.merge(companyFixture, {
            image: companyFixture.logo
        });

        delete newComapny.logo;

        return newComapny;
    }
}

export default Repository;
