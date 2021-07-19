import React from "react";
import PropTypes from "prop-types";

class GalleryImmersive extends React.Component {
    /**
     * @protected
     * @method _renderImages
     * @returns {Array}
     */
    _renderImages() {
        return this.props.items.map((item) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <img
                data-review={item.getReviewId()}
                data-id={item.getId()}
                key={item.getId()}
                src={item.getSmall()}
                alt={item.getAlt()}
                width="80"
                height="80"
                onClick={this.props.showReviewGallery}
            />
        ));
    }

    render() {
        return (
            <div className="gallery-immersive">
                {this._renderImages()}
            </div>
        );
    }
}

GalleryImmersive.propTypes = {
    items: PropTypes.instanceOf(Array),
    showReviewGallery: PropTypes.func
};

GalleryImmersive.defaultProps = {
    showReviewGallery: () => {},
    items: []
};

export default GalleryImmersive;
