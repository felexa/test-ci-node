import axios from "axios";
import HttpClientAdapter from "../HttpClientAdapter";

class AxiosAdapter extends HttpClientAdapter {
    /**
     * @method
     * @returns {void}
     */
    async makeRequest() {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        this.request.on("cancel", function () {
            source.cancel();
        });

        setTimeout(() => {
            source.cancel();
        }, this.request.getTimeoutValue());

        try {
            const response = await axios({
                url: this.request.getUrl(),
                method: this.request.getMethod().display,
                headers: this.request.getHeaders(),
                data: this.request.getBody(),
                cancelToken: source.token,
                responseType: this.request.getResponseType().display.toLowerCase(),
                ...this.request.getAdapterOptions()
            });

            this.success(response.status, response.headers, response.data);
        } catch (error) {
            this.error(error.message, error.response.status);
        }
    }
}

export default AxiosAdapter;
