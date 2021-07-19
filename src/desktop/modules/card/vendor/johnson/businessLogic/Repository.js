import _ from "lodash";

import company from "./fixture/company";
import categories from "./fixture/categories";
import trademarks from "./fixture/trademarks";
import promo from "./fixture/promo";
import banner from "./fixture/banner";

class Repository {
    constructor() {
        this.company = this.transformerCompany(company);
        this.categories = categories;
        this.trademarks = trademarks;
        this.promo = promo;
        this.banner = banner;
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
     * @method getTrademarks
     * @param success
     * @returns {Promise}
     */
    getTrademarks(success) {
        success(this.trademarks);

        return Promise.resolve(this.trademarks);
    }

    /**
     * @public
     * @method getPromo
     * @param success
     * @returns {Promise}
     */
    getPromo(success) {
        success(this.promo);

        return Promise.resolve(this.promo);
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
