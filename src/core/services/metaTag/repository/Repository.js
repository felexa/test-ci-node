/* eslint-disable max-len */

import _ from "lodash";

class Repository {
    constructor(props) {
        /**
         * @example
         *
         * @property urls
         * @type {Object}
         */
        this.urls = props.urls;

        /**
         * @property
         * @type {HttpClient}
         */
        this.HttpClient = props.dependencies.HttpClient;

        /**
         * @property httpClient
         * @type {HttpClient}
         */
        this.httpClient = new this.HttpClient();
    }

    /**
     * @public
     * @method getMetaTags
     * @param url {string}
     * @param lang {string}
     * @param [success] {Function}
     * @param [error] {Function}
     * @returns {Promise}
     */
    getMetaTags(url, lang, success = () => {}, error = () => {}) {
        return this.httpClient
            .setBaseUrl(this.urls.getMetaTags.domain)
            .request({
                path: this.urls.getMetaTags.path,
                method: this.HttpClient.methods.GET,
                headers: {
                    "accept-language": lang
                },
                query: _.assign({}, this.urls.getMetaTags.query, {url})
            })
            .then((response) => {
                success(response.data);
            }, error);
    }
}

export default Repository;
