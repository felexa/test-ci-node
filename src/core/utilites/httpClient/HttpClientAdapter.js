import HttpClientError from "./HttpClientError";

class HttpClientAdapter {
    request = null;

    constructor() {
        if (new.target === HttpClientAdapter) {
            throw new HttpClientError(this.request, "Cannot construct HttpClientAdapter instances directly");
        }
    }

    /**
     * @method installRequestInstance
     * @param request {HttpClientRequest}
     * @returns {HttpClientAdapter}
     */
    installRequestInstance(request) {
        this.request = request;

        return this;
    }

    /**
     * @method
     * @returns {void}
     */
    makeRequest() {
        throw new HttpClientError(this.request, "Driver method makeRequest not implemented");
    }

    /**
     * @method success
     * @param status {number}
     * @param headers {Object}
     * @param data {Object}
     * @returns {void}
     */
    success(status, headers, data) {
        this.request.observer.trigger("success", status, headers, data);
    }

    /**
     * @method error
     * @param message {string}
     * @param status {number}
     * @returns {void}
     */
    error(message, status) {
        this.request.observer.trigger("error", message, status);
    }
}

export default HttpClientAdapter;
