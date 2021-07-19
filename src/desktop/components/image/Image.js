import React from "react";
import PropTypes from "prop-types";

import Resource from "app/core/resource";

class Image extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property linksResource
         * @type {Resource}
         */
        this.linksResource = Resource.links;

        /**
         * @property defaultImage
         * @type {string}
         */
        this.defaultImage = this.linksResource.images.corrupted;

        this.ref = React.createRef();

        this.error = this.error.bind(this);
    }

    /**
     * @componentDidMount
     */
    componentDidMount() {
        this.ref.current.addEventListener("error", this.error);
    }

    /**
     * @componentWillUnmount
     */
    componentWillUnmount() {
        this.ref.current.removeEventListener("error", this.error);
    }

    /**
     * @private
     * @method error
     * @returns {void}
     */
    error() {
        this.ref.current.src = this.defaultImage;
    }

    /**
     * @private
     * @method _getImageWidth
     * @returns {string|number}
     */
    _getImageWidth() {
        return this.props.width || "";
    }

    /**
     * @private
     * @method _getImageHeight
     * @returns {string|number}
     */
    _getImageHeight() {
        return this.props.height || "";
    }

    /**
     * @public
     * @method render
     * @returns {String}
     */
    render() {
        return (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img
                {...this.props}
                ref={this.ref}
                width={this._getImageWidth()}
                height={this._getImageHeight()}
            />
        );
    }
}

Image.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
};

Image.defaultProps = {
    width: 0,
    height: 0
};

export default Image;
