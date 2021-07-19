/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

import Translator from "app/core/utilites/strings/translator";

class Rating extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property
         * @type {Translator}
         */
        this.translator = Translator.getInstance();

        /**
         * @property
         * @type {Object}
         */
        this.stringKeys = Translator.stringKeys;
    }

    /**
     * @private
     * @method translateCommentsCount
     * @returns {string}
     */
    translateCommentsCount(count) {
        return this.translator.plural(count, this.stringKeys.review);
    }

    /**
     * @method renderItems
     * @returns {Array}
     */
    renderItems() {
        return this.props.items.map((item, index) => (
            <div
                className="ratings__item item d-flex align-items-center"
                key={index}
                data-max-rating={item.getRating().getValue()}
            >
                <div className="item__icon">
                    <span className="icon icon-star" />
                </div>

                <div className="item__rating">
                    { item.getRating().getValue() }
                </div>

                <div className="item__percent align-self-center">
                    <div className="item__progress rounded-4 text-center">
                        <div className="item__progress-value rounded-4" style={{width: `${item.getPercent()}%`}} />
                    </div>
                </div>

                <div className="item__comments-count">
                    { item.getCommentsCount() } { this.translateCommentsCount(item.getCommentsCount()) }
                </div>
            </div>
        ));
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className="review__ratings ratings rounded-10">
                <div className="ratings__body">
                    <div className="ratings__items">
                        { this.renderItems() }
                    </div>
                </div>
            </div>
        );
    }
}

Rating.propTypes = {
    items: PropTypes.instanceOf(Array)
};

Rating.defaultProps = {
    items: []
};

export default Rating;
