import faq from "./fixture/FAQ";
import advantages from "./fixture/advantages";

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
         * @property HttpClient
         * @type {HttpClient}
         */
        this.HttpClient = props.dependencies.HttpClient;

        /**
         * @property httpClient
         * @type {HttpClient}
         */
        this.httpClient = new this.HttpClient();

        this.faq = faq;
        this.advantages = advantages;
    }

    /**
     * @private
     * @method _buildFeedback
     * @param feedback {Object}
     * @return {Object}
     */
    _buildFeedback(feedback) {
        return {
            name: feedback.name,
            city: feedback.city,
            phone: feedback.phone
        };
    }

    /**
     * @public
     * @method getFAQ
     * @param success
     * @returns {Promise}
     */
    getFAQ(success) {
        success(this.faq);

        return Promise.resolve(this.faq);
    }

    /**
     * @public
     * @method getAdvantages
     * @param success
     * @returns {Promise}
     */
    getAdvantages(success) {
        success(this.advantages);

        return Promise.resolve(this.advantages);
    }
}

export default Repository;
