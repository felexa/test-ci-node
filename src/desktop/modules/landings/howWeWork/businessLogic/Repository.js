import faq from "./fixture/FAQ";

class Repository {
    constructor() {
        this.faq = faq;
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
}

export default Repository;
