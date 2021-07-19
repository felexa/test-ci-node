import faq from "./fixture/FAQ";

class Repository {
    constructor() {
        this.faq = faq;
    }

    /**
     * @public
     * @method getFaq
     * @param success
     * @returns {Promise}
     */
    getFaq(success) {
        success(this.faq);

        return Promise.resolve(this.faq);
    }
}

export default Repository;
