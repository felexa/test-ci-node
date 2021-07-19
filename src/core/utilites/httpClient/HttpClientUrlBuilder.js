import {compile} from "path-to-regexp";
import httpBuildQuery from "http-build-query";

class HttpClientUrlBuilder {
    urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    constructor() {
        this.baseUrl = "";
    }

    /**
     * @method setBaseUrl
     * @param url {string}
     * @returns {HttpClientUrlBuilder}
     */
    setBaseUrl(url) {
        if (!this.urlRegex.test(url)) {
            throw new TypeError("Invalid URL");
        }

        this.baseUrl = url;

        return this;
    }

    /**
     * @method build
     * @param path {string}
     * @param options {Object}
     * @returns {string}
     */
    build(path, options) {
        let url = new URL(this.baseUrl),
            pathCompiler = compile(path, {
                encode: encodeURIComponent
            }),
            pathname = pathCompiler(options.params),
            search = httpBuildQuery(options.query);

        url.pathname = pathname;
        url.search = search;

        return url.toString();
    }
}

export default HttpClientUrlBuilder;
