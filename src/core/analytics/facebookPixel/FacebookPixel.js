import ReactFacebookPixel from "react-facebook-pixel";

class FacebookPixel {
    constructor(props) {
        /**
         * @property id
         * @type {string}
         */
        this.id = props.id;

        /**
         * @property facebookPixel
         * @type {Object}
         */
        this.facebookPixel = ReactFacebookPixel;
    }

    /**
     * @public
     * @method init
     * @returns {FacebookPixel}
     */
    init() {
        this.facebookPixel.init(this.id);
        this.facebookPixel.pageView();

        return this;
    }
}

export default FacebookPixel;
