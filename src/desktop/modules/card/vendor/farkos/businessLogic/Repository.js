import _ from "lodash";
import company from "./fixture/company";
import banner from "./fixture/banner";
import vendorAdvantages from "./fixture/advantagesOfVendor";
import productAdvantages from "./fixture/advantageProduct";
import mainProduct from "./fixture/mainProduct";

class Repository {
    constructor() {
        this.company = this.transformerCompany(company);
        this.banner = banner;
        this.vendorAdvantages = vendorAdvantages;
        this.productAdvantages = productAdvantages;
        this.mainProduct = mainProduct;
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
     * @private
     * @param Company
     * @returns {Company}
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
