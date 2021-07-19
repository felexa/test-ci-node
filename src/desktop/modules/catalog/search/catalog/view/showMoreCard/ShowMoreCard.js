import React from "react";
import PropTypes from "prop-types";

import Box from "app/core/components/Box";
import Translator from "app/core/utilites/strings/translator";
import Resource from "app/core/resource";

class ShowMoreCard extends React.Component {
    constructor(props) {
        super(props);
        this.Translator = Translator;

        /**
         * @property translator
         * @type {Translator}
         */
        this.translator = this.Translator.getInstance();

        this.Resource = Resource;
    }

    /**
     * @private
     * @method _getPluralProductsForShowMore
     * @returns {string}
     */
    _getPluralProducts() {
        return this.translator.plural(this.props.count, this.Translator.stringKeys.products);
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <Box
                component="div"
                rounded={16}
                className="show-more-card products__item bg-white new-super-box-shadow"
                onClick={this.props.change}
            >
                <div className="d-flex align-items-center justify-content-center h-100">
                    <img
                        alt="showMore"
                        src={this.Resource.links.icons.refresh}
                        className="mr-12"
                    />
                    <span className="mr-8">{this.Resource.strings.show.more}</span>
                    <span>{`${this.props.count} ${this._getPluralProducts()}`}</span>
                </div>
            </Box>
        );
    }
}

ShowMoreCard.propTypes = {
    count: PropTypes.number,
    change: PropTypes.func.isRequired
};

ShowMoreCard.defaultProps = {
    count: 0
};

export default ShowMoreCard;
