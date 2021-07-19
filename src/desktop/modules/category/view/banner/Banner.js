import React from "react";
import PropTypes from "prop-types";

class Banner extends React.Component {
    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="banner">
                <img
                    className="rounded-16"
                    src={this.props.banner.getPreview().getDesktop().getSmall()}
                    alt={this.props.banner.getTitle()}
                />
            </div>
        );
    }
}

Banner.defaultProps = {
    banner: {}
};

Banner.propTypes = {
    banner: PropTypes.instanceOf(Object)
};

export default Banner;
