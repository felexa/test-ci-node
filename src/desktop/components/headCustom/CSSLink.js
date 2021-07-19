/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";

class CSSLink extends React.Component {
    constructor(props) {
        super(props);

        this.env = Env.getInstance();
    }

    /**
     * @method _buildLink
     * @return {string}
     * @private
     */
    _buildLink() {
        return `
            <link
                key="${this.props.src}-style"
                nonce="${this.props.nonce}"
                rel="stylesheet"
                href="${this.props.src}"
                crossOrigin="${this.props.crossOrigin}"
            />
        `;
    }

    /**
     * @method
     * @return {string}
     * @private
     */
    _buildPreloadLink() {
        return `
            <link
                key="${this.props.src}-preload"
                nonce="${this.props.nonce}"
                rel="preload"
                as="style"
                href="${this.props.src}"
                crossOrigin="${this.props.crossOrigin}"
            />
        `;
    }

    /**
     * @method _buildAsyncLink
     * @return {string}
     * @private
     */
    _buildAsyncLink() {
        return `
            <link
                key="${this.props.src}-preload"
                nonce="${this.props.nonce}"
                rel="preload"
                as="style"
                href="${this.props.src}"
                crossOrigin="${this.props.crossOrigin}"
                onload="var context = this; this.onload = null; setTimeout(function() {context.rel = 'stylesheet'}, ${this.env.getCSSLoadDelay()})"
            />
        `;
    }

    /**
     * @method _buildLinkElement
     * @return {string}
     * @private
     */
    _buildLinkElement() {
        let result = `${this._buildLink()} ${this._buildPreloadLink()}`;

        if (this.props.async) {
            result = this._buildAsyncLink();
        }

        return result;
    }

    /**
     * @method render
     * @return {React.element}
     */
    render() {
        return (<div dangerouslySetInnerHTML={{__html: this._buildLinkElement()}} />);
    }
}

CSSLink.propTypes = {
    src: PropTypes.string.isRequired,
    nonce: PropTypes.string,
    crossOrigin: PropTypes.string,
    async: PropTypes.bool
};

CSSLink.defaultProps = {
    nonce: "",
    crossOrigin: "",
    async: false
};

export default CSSLink;
