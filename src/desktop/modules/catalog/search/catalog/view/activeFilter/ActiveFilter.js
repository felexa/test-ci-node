import React from "react";
import PropTypes from "prop-types";

import Resource from "app/core/resource";

class ActiveFilter extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;

        this._removeSelectedFilter = this._removeSelectedFilter.bind(this);
    }

    /**
     * @private
     * @method _removeSelectedFilter
     * @param e {Event{}}
     * @returns {void}
     */
    _removeSelectedFilter(e) {
        if (e.target.classList[1] === "icon-close") {
            this.props.change(e);
        }
    }

    render() {
        return (
            <div className="catalog__active-filter d-md-flex color-black">
                <div className="active-filter__title">
                    {this.Resource.strings.youChoose}
                </div>

                <div className="active-filter__items" onClick={this._removeSelectedFilter}>
                    {this.props.items.map((item) => (
                        <div className="item" key={item.id}>
                            <span>{item.value}</span>
                            <div className="active-filter__item-close">
                                <i className="icon icon-close" data-id={item.id} />
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    className="active-filter__reset btn-default--outline"
                    onClick={this.props.reset}
                >
                    {this.Resource.strings.reset}
                </button>
            </div>
        );
    }
}

ActiveFilter.propTypes = {
    items: PropTypes.instanceOf(Object).isRequired,
    reset: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired
};

export default ActiveFilter;
