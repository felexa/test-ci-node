import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

class ProgressiveImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoadedOriginalImage: false
        };
    }

    componentDidMount() {
        const buffer = new Image();

        setTimeout(() => {
            buffer.src = this.props.src;
        }, this.props.timeOut);

        buffer.onload = () => this.setState({isLoadedOriginalImage: true});
    }

    /**
     * @private
     * @method _hasPreview
     * @returns {boolean}
     */
    _hasPreview() {
        return Boolean(this.props.previewSrc);
    }

    /**
     * @private
     * @method _getPreviewSrc
     * @returns {string}
     */
    _getPreviewSrc() {
        return this._hasPreview() ?
            this.props.previewSrc :
            this.props.src;
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
     * @returns {React.element}
     */
    render() {
        return (
            <div className={classnames("progressive-image", this.props.className)}>
                {this.state.isLoadedOriginalImage && (
                    <img
                        className="progressive-image__original"
                        width={this._getImageWidth()}
                        height={this._getImageHeight()}
                        src={this.props.src}
                        alt={this.props.alt}
                    />
                )}

                <img
                    className={classnames("progressive-image__preview", {hide: this.state.isLoadedOriginalImage})}
                    width={this._getImageWidth()}
                    height={this._getImageHeight()}
                    src={this._getPreviewSrc()}
                    alt={this.props.alt}
                />
            </div>
        );
    }
}

ProgressiveImage.propTypes = {
    src: PropTypes.string.isRequired,
    previewSrc: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    timeOut: PropTypes.number,
    className: PropTypes.string,
    alt: PropTypes.string
};

ProgressiveImage.defaultProps = {
    timeOut: 1500,
    width: 0,
    height: 0,
    alt: "",
    className: ""
};

export default ProgressiveImage;
