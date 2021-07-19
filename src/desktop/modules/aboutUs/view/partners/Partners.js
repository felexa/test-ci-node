import React from "react";
import PropTypes from 'prop-types';

class Partners extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property items
         * @type {Brand[]}
         */
        this.items = props.items;
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this.items.map(function (item) {
            return (
                <div
                    className="partners__item rounded-10"
                    title={item.getName()}
                    key={item.getId()}
                >
                    <a
                        target="_blank"
                        className="d-flex justify-content-center align-items-center h-100 w-100 p-16"
                        href={item.getUrl()}
                    >
                        <div className="item__preview d-flex align-items-center justify-content-center">
                            <img
                                src={item.getLogo().getMedium()}
                                alt={item.getName()}
                            />
                        </div>
                    </a>
                </div>
            );
        });
    }

    /**
     * @public
     * @method render
     * @return {React.Element}
     */
    render() {
        return (
            <div className="partners">
                <div className="partners__body">
                    <div className="partners__items">
                        { this._renderItems() }
                    </div>
                </div>
            </div>
        );
    }
}

Partners.propTypes = {
    items: PropTypes.instanceOf(Array).isRequired
};

export default Partners;
