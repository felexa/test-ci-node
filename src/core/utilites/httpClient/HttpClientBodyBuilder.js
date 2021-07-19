class HttpClientBodyBuilder {
    /**
     * @constructor
     * @param request {HttpClientRequest}
     * @returns {void}
     */
    constructor(request) {
        this.request = request;
        this.dataType = this.request.getDataType();

        if (!this.request.dataTypes.contains(this.dataType)) {
            throw new TypeError("Unknown dataType");
        }

        this.toJson = this.toJson.bind(this);
        this.toUrlEncoded = this.toUrlEncoded.bind(this);

        this.serializeMap = new Map([
            [this.request.dataTypes.JSON, this.toJson],
            [this.request.dataTypes.URLENCODED, this.toUrlEncoded]
        ]);
    }

    /**
     * @method build
     * @param bodyObject {Object}
     * @returns {string|FormData|null}
     */
    build(bodyObject) {
        if (this.request.getMethod().value.hasBody) {
            let bodyDataSerialize = this.serializeMap.get(this.dataType);

            this.request.setHeaders(this.dataType.value.headers);

            return bodyDataSerialize(bodyObject);
        }

        return null;
    }

    /**
     * @method toJson
     * @param object {Object}
     * @returns {string}
     */
    toJson(object) {
        return JSON.stringify(object);
    }

    /**
     * @method toUrlEncoded
     * @param object {Object}
     * @returns {string}
     */
    toUrlEncoded(object = {}) {
        return Object.keys(object)
            .reduce(function (result, key) {
                result.push(`${key}=${object[key]}`);

                return result;
            }, [])
            .join("&");
    }
}
export default HttpClientBodyBuilder;
