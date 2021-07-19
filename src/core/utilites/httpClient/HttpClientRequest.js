import Promise from "promise-abortable";

import Env from "app/core/environment";

import LocalStorage from "app/core/utilites/storage/localStorage";
import LocalStorageNameEnum from "app/core/utilites/enum/localStorageName";

import DataTypes from "./enum/DataTypes";
import ResponseTypes from "./enum/ResponseTypes";

import Observer from "../observer/Observer";
import HttpClientError from "./HttpClientError";
import HttpClientAdapter from "./HttpClientAdapter";
import HttpClientResponse from "./HttpClientResponse";
import HttpClientBodyBuilder from "./HttpClientBodyBuilder";

class HttpClientRequest {
    dataTypes = DataTypes;

    responseTypes = ResponseTypes;

    defaultOptions = {
        query: {},
        params: {},
        headers: {
            "Accept-Language": Env.getInstance().getLanguage()
            // eslint-disable-next-line max-len
            // Authorization: `Bearer ${LocalStorage.getInstance().getItem(LocalStorageNameEnum.getInstance().getTokenAsValue()) || ""}`
        },
        body: {},
        dataType: this.dataTypes.JSON,
        responseType: this.responseTypes.JSON
    };

    /**
     * @constructor
     * @param driver {HttpClientAdapter}
     * @param urlBuilder {HttpClientUrlBuilder}
     * @param method {EnumSymbol}
     * @param path {string}
     * @param options {Object}
     * @param onSuccess {Function}
     * @param onError {Function}
     * @returns {void}
     */
    constructor(driver, urlBuilder, method, path, options, onSuccess, onError) {
        if (!driver) {
            throw new HttpClientError(this, "HttpClientAdapter not provided!");
        }

        if (!(driver instanceof HttpClientAdapter)) {
            throw new HttpClientError(this, "Invalid HttpClientAdapter!");
        }

        this.token = LocalStorage.getInstance().getItem(LocalStorageNameEnum.getInstance().getTokenAsValue());

        this.path = path;
        this.driver = driver;
        this.method = method;
        this.options = {...this.defaultOptions, ...options};
        this.onSuccess = onSuccess;
        this.onError = onError;

        if (this.token) {
            this.options.headers.Authorization = `Bearer ${this.token}`;
        }

        let bodyBuilder = new HttpClientBodyBuilder(this);

        this.url = urlBuilder.build(this.path, this.options);
        this.body = bodyBuilder.build(this.options.body);
        this.headers = this.options.headers;

        this.observer = new Observer().installTo(this);

        this.env = Env.getInstance();

        this.make = this.make.bind(this);
        this.getDataType = this.getDataType.bind(this);

        this.driver.installRequestInstance(this);
    }

    /**
     * @method getMethod
     * @returns {Enum}
     */
    getMethod() {
        return this.method;
    }

    /**
     * @method getUrl
     * @returns {URL}
     */
    getUrl() {
        return this.url;
    }

    /**
     * @method getHeaders
     * @returns {Headers}
     */
    getHeaders() {
        return this.headers;
    }

    /**
     * @method getBody
     * @returns {string|FormData|null}
     */
    getBody() {
        return this.body;
    }

    /**
     * @method getDataType
     * @returns {EnumSymbol}
     */
    getDataType() {
        return this.options.dataType;
    }

    /**
     * @method getResponseType
     * @returns {EnumSymbol}
     */
    getResponseType() {
        return this.options.responseType;
    }

    /**
     * @method getTimeoutValue
     * @returns {number}
     */
    getTimeoutValue() {
        return this.options.timeout || Number(this.env.getHttpClientRequestTimeout());
    }

    /**
     * @method getAdapterOptions
     * @returns {Object}
     */
    getAdapterOptions() {
        return this.options.adapterOptions || {};
    }

    /**
     * @method setHeaders
     * @param headers {Object}
     * @returns {void}
     */
    setHeaders(headers) {
        this.options.headers = {
            ...this.options.headers,
            ...headers
        };
    }

    /**
     * @method make
     * @returns {Promise}
     */
    make() {
        return new Promise((resolve, reject, signal) => {
            this.on("success", (statusCode, headers, data) => {
                let response = new HttpClientResponse(this, statusCode, headers, data);

                return this.onSuccess ? this.onSuccess(response) : resolve(response);
            });

            this.on("error", (errorMessage, statusCode) => {
                let error = new HttpClientError(this, errorMessage, statusCode);

                return this.onError ? this.onError(error) : reject(error);
            });

            signal.onabort = () => {
                this.observer.trigger("cancel");
            };

            this.driver.makeRequest();
        });
    }
}

export default HttpClientRequest;
