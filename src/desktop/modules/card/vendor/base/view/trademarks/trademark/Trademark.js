import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Rating from "desktop/components/rating/Rating";

class Trademark extends React.Component {
    constructor(props) {
        super(props);
        this._change = this._change.bind(this);
    }

    /**
     * @private
     * @method _getTrademark
     * @returns {Trademark}
     */
    _getTrademark() {
        return this.props.trademark;
    }

    /**
     * @private
     * @method _getGeneric
     * @returns {Generic}
     */
    _getGeneric() {
        return this._getTrademark().getGeneric();
    }

    /**
     * @private
     * @method _change
     * @returns {Description}
     */
    _change() {
        this.props.change(this._getTrademark().getId());

        return this;
    }

    /**
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className={classnames("trademark", {active: this.props.isOpen})}>
                <div className="trademark__header d-flex justify-content-between align-items-center">
                    <div className="trademark__col">
                        <div className="trademark__preview">
                            <img
                                src={this._getTrademark().getLogo().getSmall()}
                                alt={this._getTrademark().getLogo().getAlt()}
                            />
                        </div>
                    </div>

                    <div className="trademark__col d-flex">
                        <div className="trademark__rating d-flex align-items-center">
                            <Rating readonly rating={this._getTrademark().getRating()} />

                            <span className="trademark__rating-value color-black">
                                {this._getTrademark().getRating()}/5
                            </span>
                        </div>

                        <button
                            className="trademark__toggle d-flex justify-content-center align-items-center"
                            type="button"
                            onClick={this._change}
                        >
                            <i className="icon icon-chevron-up" />
                        </button>
                    </div>
                </div>

                <div className="trademark__body new-super-box-shadow">
                    <div className="trademark__title f-weight-5 color-black mb-12 mb-lg-16">
                        {this._getTrademark().getName()}
                    </div>

                    <div className="trademark__properties">
                        {this._getGeneric().getName() && (
                            <div className="item mb-6">
                                <span className="item__title">Джене́рик: </span>

                                <a
                                    className="item__description"
                                    href={this._getGeneric().getUrl()}
                                >
                                    {this._getGeneric().getName()}
                                </a>
                            </div>
                        )}

                        <div className="item mb-6">
                            <span className="item__title">Торговое название: </span>

                            <a
                                className="item__description"
                                href={this._getTrademark().getUrl()}
                            >
                                {this._getTrademark().getName()}
                            </a>
                        </div>

                        <div className="item mb-6">
                            <span className="item__title">Класс лекарств: </span>

                            <span className="item__description color-black">
                                {this._getTrademark().getDescription()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Trademark.defaultProps = {
    change: () => {},
    isOpen: false
};

Trademark.propTypes = {
    trademark: PropTypes.instanceOf(Object).isRequired,
    change: PropTypes.instanceOf(Function),
    isOpen: PropTypes.bool
};

export default Trademark;
