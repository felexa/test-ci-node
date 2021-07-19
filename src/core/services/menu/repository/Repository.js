import HttpClient from "app/core/utilites/httpClient/HttpClient";
import catalog from "./catalog";
// import catalogFirstLevel from "./catalogFirstLevel.json";

class Repository {
    constructor(props) {
        this.urls = props.urls;

        /**
         * @property catalog
         * @type {Array}
         */
        this.catalog = catalog;

        /**
         * @property menu
         * @type {Array}
         */
        this.menu = [];

        this.httpClient = new HttpClient();
    }

    /**
     * @method getCatalog
     * @param success {Function}
     */
    getCatalog(success) {
        if (!this.menu.length) {
            this.menu = catalog;
        }

        return Promise.resolve(this.menu).then(() => {
            success(this.menu);
        });
    }
}

export default Repository;
