import React from "react";
import PropTypes from "prop-types";

import Category from "./category/Category";

class Categories extends React.Component {
    /**
     * @private
     * @method _renderCategories
     * @returns {React.element}
     */
    _renderCategories() {
        return (
            <div className="categories__items d-flex flex-wrap">
                {this.props.categories.map((category) => (
                    <div key={category.getId()} className="categories__item">
                        <Category category={category} />
                    </div>
                ))}
            </div>
        );
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="categories">
                <div className="categories__header mb-16">
                    <h2 className="categories__title f-weight-5 color-black">Категории</h2>
                </div>

                <div className="categories__body">
                    {this._renderCategories()}
                </div>
            </div>
        );
    }
}

Categories.propTypes = {
    categories: PropTypes.instanceOf(Array)
};

Categories.defaultProps = {
    categories: []
};

export default Categories;
