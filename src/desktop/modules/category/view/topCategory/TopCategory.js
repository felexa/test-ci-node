import React from "react";
import PropTypes from "prop-types";
import NativeCarousel from "desktop/components/nativeCarousel/NativeCarousel";

class TopCategory extends React.Component {
    /**
     * @private
     * @method _renderItems
     * @returns {React.element}
     */
    _renderItems() {
        return this.props.topCategory.map((item) => (
            <a href={item.getUrl()} key={item.getId()} className="top-category__item d-md-flex flex-md-column text-decoration-none">
                <div className="top-category__preview d-flex align-items-center justify-content-center">
                    <img src={item.getIcon().getSmall()} alt={item.getName()} />
                </div>

                <span className="top-category__name d-flex align-items-center justify-content-between bg-gray rounded-16 ">
                    {item.getName()}

                    <i className="icon icon-arrow-right" />
                </span>
            </a>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="top-category">
                <NativeCarousel>
                    <div className="top-category__items">
                        {this._renderItems()}
                    </div>
                </NativeCarousel>
            </div>
        );
    }
}

TopCategory.propTypes = {
    topCategory: PropTypes.instanceOf(Array).isRequired
};

export default TopCategory;
