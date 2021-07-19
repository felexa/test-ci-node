import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

class Categories extends React.Component {
    constructor(props) {
        super(props);

        this._change = this._change.bind(this);
    }

    /**
     * @private
     * @method _change
     * @param e {Event{}}
     * @returns {void}
     */
    _change(e) {
        this.props.change(e.target.dataset.id);
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="categories" onClick={this._change}>
                {this.props.items.map((category, index) => (
                    <div
                        className={classNames("categories__item text-decoration-none", {
                            active: category.getSelected()
                        })}
                        data-id={category.getId()}
                        key={index}
                    >
                        {category.getName()}
                    </div>
                ))}
            </div>
        );
    }
}

Categories.propTypes = {
    change: PropTypes.func.isRequired,
    items: PropTypes.instanceOf(Array)
};

Categories.defaultProps = {
    items: []
};

export default Categories;
