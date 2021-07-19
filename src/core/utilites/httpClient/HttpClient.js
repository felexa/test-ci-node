import DataTypes from "./enum/DataTypes";
import HttpMethods from "./enum/HttpMethods";
import ResponseTypes from "./enum/ResponseTypes";
import HttpClientRequest from "./HttpClientRequest";
import HttpClientUrlBuilder from "./HttpClientUrlBuilder";
import HttpClientAdapter from "./adapters/FetchAdapter";

class HttpClient {
    static methods = HttpMethods;

    static dataTypes = DataTypes;

    static responseTypes = ResponseTypes;

    /**
     * @constructor
     * @param baseUrl {string}
     * @returns {void}
     */
    constructor(baseUrl = null) {
        this.urlBuilder = new HttpClientUrlBuilder();

        if (baseUrl) {
            this.urlBuilder.setBaseUrl(baseUrl);
        }
    }

    /**
     * @method setBaseUrl
     * @param baseUrl {string}
     * @returns {HttpClient}
     */
    setBaseUrl(baseUrl) {
        this.urlBuilder.setBaseUrl(baseUrl);

        return this;
    }

    /**
     * @method request
     * @param options {Object}
     * @returns {Promise}
     */
    request(options) {
        let {
            method, path, onSuccess, onError, ...truncatedOptions
        } = options;

        let httpClientRequest = new HttpClientRequest(
            new HttpClientAdapter(),
            this.urlBuilder,
            method,
            path,
            truncatedOptions,
            onSuccess,
            onError
        );

        return httpClientRequest.make();
    }

    /**
     * @method get
     * @param path {string}
     * @param options {Object}
     * @param onSuccess {Function}
     * @param onError {Function}
     * @returns {Promise}
     */
    get(path, options, onSuccess, onError) {
        return this.request({
            method: HttpClient.methods.GET,
            path,
            onSuccess,
            onError,
            ...options
        });
    }

    /**
     * @method post
     * @param path {string}
     * @param options {Object}
     * @param onSuccess {Function}
     * @param onError {Function}
     * @returns {Promise}
     */
    post(path, options, onSuccess, onError) {
        return this.request({
            method: HttpClient.methods.POST,
            path,
            onSuccess,
            onError,
            ...options
        });
    }

    /**
     * @method put
     * @param path {string}
     * @param options {Object}
     * @param onSuccess {Function}
     * @param onError {Function}
     * @returns {Promise}
     */
    put(path, options, onSuccess, onError) {
        return this.request({
            method: HttpClient.methods.PUT,
            path,
            onSuccess,
            onError,
            ...options
        });
    }

    /**
     * @method delete
     * @param path {string}
     * @param options {Object}
     * @param onSuccess {Function}
     * @param onError {Function}
     * @returns {Promise}
     */
    delete(path, options, onSuccess, onError) {
        return this.request({
            method: HttpClient.methods.DELETE,
            path,
            onSuccess,
            onError,
            ...options
        });
    }

    /**
     * @method patch
     * @param path {string}
     * @param options {Object}
     * @param onSuccess {Function}
     * @param onError {Function}
     * @returns {Promise}
     */
    patch(path, options, onSuccess, onError) {
        return this.request({
            method: HttpClient.methods.PATCH,
            path,
            onSuccess,
            onError,
            ...options
        });
    }
}

export default HttpClient;
