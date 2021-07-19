import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Selection extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this._removeSelectedFilter = this._removeSelectedFilter.bind(this);
    }

    /**
     * @private
     * @method _removeSelectedFilter
     * @param e {Object}
     * @returns {void}
     */
    _removeSelectedFilter(e) {
        if (e.target.classList[1] === "icon-close") {
            this.props.change(e);
        }
    }

    render() {
        return (
            <div className="search__selection d-none d-md-flex align-items-center color-black">
                <div className="selection__title">
                    {this.stringsResource.youChoose}
                </div>

                <button
                    type="button"
                    className="selection__reset btn-default--outline"
                    onClick={this.props.reset}
                >
                    {this.stringsResource.reset}
                </button>

                <div className="selection__items d-md-flex align-items-center" onClick={this._removeSelectedFilter}>
                    {this.props.items.map((item) => (
                        <div className="item" key={item.id}>
                            <span>{item.value}</span>
                            <i className="icon icon-close" data-id={item.id} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

Selection.propTypes = {
    items: PropTypes.instanceOf(Object).isRequired,
    reset: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired
};

export default Selection;
