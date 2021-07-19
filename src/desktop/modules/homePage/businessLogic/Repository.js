// import aboutText from "./fixture/aboutText.json";
import awards from "./fixture/awards.json";
// import share from "./fixture/share.json";
// import story from "./fixture/story.json";

class Repository {
    constructor(props) {
        /**
         * @example
         *
         * urls = {
         *     getProduct: {
         *         domain: string,
         *         path: string
         *     }
         * }
         *
         * @property urls
         * @type {Object}
         */
        this.urls = props.urls;

        this.HttpClient = props.dependencies.HttpClient;

        this.httpClient = new this.HttpClient();

        this.share = {};
        this.story = {};
        this.about = {};
        this.awards = awards;
    }

    /**
     * @public
     * @method getStory
     * @param [success] {Function}
     // * @param [error] {Function}
     * @return {Promise}
     */
    getStory(success = () => {} /*, error = () => {}*/) {
        let result = this.story;

        return new Promise((resolve) => {
            resolve(result);
            success(result);
        });
        // return this.httpClient
        //     .setBaseUrl(this.urls.getStory.domain)
        //     .request({
        //         path: this.urls.getStory.path,
        //         method: this.HttpClient.methods.GET,
        //         params: {},
        //         query: this.urls.getStory.query
        //     })
        //     .then((response) => {
        //         success(response.data);
        //     }, error);
    }

    /**
     * @public
     * @method getShare
     * @param [success] {Function}
     // * @param [error] {Function}
     * @return {Promise}
     */
    getShare(success = () => {} /*, error = () => {}*/) {
        let result = this.share;

        return new Promise((resolve) => {
            resolve(result);
            success(result);
        });
    }

    getAboutContent(success = () => {}) {
        let result = this.about;

        return new Promise((resolve) => {
            resolve(result);
            success(result);
        });
    }

    getAwards(success = () => {}) {
        let result = this.awards;

        return new Promise((resolve) => {
            resolve(result);
            success(result);
        });
    }
}

export default Repository;
