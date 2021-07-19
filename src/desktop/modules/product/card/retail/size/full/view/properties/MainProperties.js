import React from "react";
import PropTypes from "prop-types";

import Image from "desktop/components/image/Image";

class MainProperties extends React.Component {
    /**
     * @private
     * @method _hasTitle
     * @returns {boolean}
     */
    _hasTitle() {
        return Boolean(this.props.title);
    }

    /**
     * @private
     * @method _getTitle
     * @returns {string}
     */
    _getTitle() {
        return this.props.title;
    }

    /**
     * @private
     * @method _selectProperty
     * @param property {Object}
     * @returns {MainProperties}
     */
    _selectProperty(property) {
        this.props.selectProperty(property);

        return this;
    }

    /**
     * @private
     * @method _renderProperties
     * @returns {Array}
     */
    _renderProperties() {
        return this.props.groupProperty.getItems().map((item) => (
            <div key={item.getId()} className="item d-flex">
                <div className="item__icon">
                    <Image
                        src={item.getIcon().getOriginal()}
                        title={item.getIcon().getTitle()}
                        alt={item.getIcon().getAlt()}
                        width={40}
                        height={40}
                    />
                </div>

                <div>
                    <div className="item__title f-weight-4">
                        {item.getName()}
                    </div>

                    <span
                        className="item__description d-inline-block text-black f-weight-4 link-bordered"
                        dangerouslySetInnerHTML={{__html: item.getValue()}}
                        onClick={() => this._selectProperty(item)}
                    />
                </div>
            </div>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div
                className="properties"
            >
                <div className="properties__header">
                    {this._hasTitle() && (
                        <p className="properties__title">
                            { this._getTitle() }
                        </p>
                    )}
                </div>

                <div className="properties__body mb-24">
                    <div className="properties__items d-flex flex-wrap">
                        {this._renderProperties()}
                    </div>
                </div>
            </div>
        );
    }
}

MainProperties.propTypes = {
    groupProperty: PropTypes.instanceOf(Object),
    selectProperty: PropTypes.func,
    title: PropTypes.string
};

MainProperties.defaultProps = {
    selectProperty: () => {},
    groupProperty: {},
    title: ""
};

export default MainProperties;
