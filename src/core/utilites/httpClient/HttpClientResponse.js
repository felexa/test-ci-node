class HttpClientResponse {
    /**
     * @constructor
     * @param request {HttpClientRequest}
     * @param statusCode {int}
     * @param headers {Object}
     * @param data {any}
     * @returns {void}
     */
    constructor(request, statusCode, headers, data) {
        this.request = request;
        this.statusCode = statusCode;
        this.headers = headers;
        this.data = data;
    }

    /**
     * @method getRequest
     * @returns {HttpClientRequest}
     */
    getRequest() {
        return this.request;
    }

    /**
     * @method getStatusCode
     * @returns {int}
     */
    getStatusCode() {
        return this.statusCode;
    }

    /**
     * @method getHeaders
     * @returns {Object}
     */
    getHeaders() {
        return {
            ...this.headers,
            getContentLanguage() {
                return this["content-language"];
            }
        };
    }
}

export default HttpClientResponse;
