import {hotjar} from "react-hotjar";

class Hotjar {
    constructor(props) {
        /**
         * @property id
         * @type {number}
         */
        this.id = props.id;

        /**
         * @property snippetVersion
         * @type {number}
         */
        this.snippetVersion = props.snippetVersion;

        /**
         * @property hotjar
         * @type {Object}
         */
        this.hotjar = hotjar;
    }

    /**
     * @public
     * @method init
     * @returns {Hotjar}
     */
    init() {
        this.hotjar.initialize(this.id, this.snippetVersion);

        return this;
    }
}

export default Hotjar;
