import "isomorphic-fetch";
import "es6-promise/auto";
import "abort-controller/polyfill";

import AbortController from "abort-controller";
import HttpClientAdapter from "../HttpClientAdapter";

class FetchAdapter extends HttpClientAdapter {
    /**
     * @private
     * @method _createHeaders
     * @param responseHeaders {Object}
     * @returns {Object}
     */
    _createHeaders(responseHeaders) {
        let result = {};

        responseHeaders.forEach((value, header) => {
            result[header] = value;
        });

        return result;
    }

    /**
     * @method
     * @returns {void}
     */
    async makeRequest() {
        const controller = new AbortController();
        const signal = controller.signal;

        this.request.on("cancel", function () {
            controller.abort();
        });

        setTimeout(() => {
            controller.abort();
        }, this.request.getTimeoutValue());

        try {
            const response = await fetch(this.request.getUrl(), {
                method: this.request.getMethod().display,
                headers: this.request.getHeaders(),
                body: this.request.getBody(),
                signal,
                ...this.request.getAdapterOptions()
            });

            if (response.ok) {
                let result = null;

                switch (this.request.getResponseType()) {
                    case this.request.responseTypes.JSON:
                        result = await response.json();
                        break;
                    case this.request.responseTypes.TEXT:
                        result = await response.text();
                        break;
                    default:
                        result = null;
                        break;
                }

                this.success(
                    response.status,
                    // typeof window !== "undefined" ? _.fromPairs(response.headers.entries()) : response.headers,
                    this._createHeaders(response.headers),
                    result
                );
            } else {
                this.error(await response.text(), response.status);
            }
        } catch (error) {
            this.error(error.message);
        }
    }
}

export default FetchAdapter;
