import React from "react";
import PropTypes from "prop-types";

class Categories extends React.Component {
    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="categories" onClick={this._change}>
                {this.props.items.map((category, index) => (
                    <a
                        href={category.getUrl()}
                        className="categories__item text-decoration-none"
                        key={index}
                    >
                        {category.getName()}
                    </a>
                ))}
            </div>
        );
    }
}

Categories.propTypes = {
    items: PropTypes.instanceOf(Array)
};

Categories.defaultProps = {
    items: []
};

export default Categories;
