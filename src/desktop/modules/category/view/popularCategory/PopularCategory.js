import React from "react";
import PropTypes from "prop-types";

import Resource from "app/core/resource";
import Env from "app/core/environment";

class PopularCategory extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @private
     * @method _renderItems
     * @returns {React.element}
     */
    _renderItems() {
        return this.props.popularCategory.map((item) => (
            <div key={item.getId()} className="popular-category__item p-12 p-md-20 bg-gray rounded-16">
                <a href={item.getUrl()} className="popular-category__name text-decoration-none f-weight-5 color-black">
                    <div className="popular-category__preview d-flex align-items-center justify-content-center">
                        <img src={item.getIcon().getOriginal()} alt={item.getName()} />
                    </div>
                    <span>{item.getName()}</span>
                </a>
            </div>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="popular-category">
                <div className="row">
                    <div className="col">
                        <h4>{this.stringsResource.popularCategories}</h4>
                    </div>
                </div>
                <div className="popular-category__items text-center">
                    {this._renderItems()}
                </div>
            </div>
        );
    }
}

PopularCategory.propTypes = {
    popularCategory: PropTypes.instanceOf(Array).isRequired
};

export default PopularCategory;
