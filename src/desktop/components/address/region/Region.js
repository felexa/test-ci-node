/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Autocomplete from "app/core/components/autocomplete/Autocomplete";

class Region extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentCity: {
                getName() {
                    return "";
                },
                getId() {
                    return "";
                }
            }
        };

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.getCitiesByName = this.getCitiesByName.bind(this);
        this.selectCity = this.selectCity.bind(this);
    }

    /**
     * @method isActivePopularCity
     * @param city {Object}
     * @returns {boolean}
     */
    isActivePopularCity(city) {
        return this.state.currentCity.getId() === city.getId();
    }

    /**
     * @private
     * @method getCitiesByName
     * @param name {string}
     * @param callback {Function}
     * @return {Region}
     */
    getCitiesByName(name, callback) {
        if (name) {
            this.props.getCitiesByName(name, callback);
        } else {
            callback([]);
        }

        return this;
    }

    /**
     * @private
     * @method setCurrentCity
     * @param city {City}
     * @return {Region}
     */
    setCurrentCity(city) {
        this.setState(function () {
            return {currentCity: city};
        });

        return this;
    }

    /**
     * @private
     * @method selectCity
     * @param city {City}
     * @returns {Region}
     */
    selectCity(city) {
        this.setCurrentCity(city);

        this.props.selectCity(city);

        return this;
    }

    /**
     * @private
     * @method renderPopularCities
     * @returns {Array}
     */
    renderPopularCities() {
        return this.props.popularCities.map((item) => (
            <div
                key={item.getId()}
                className={classNames("item mb-16", {
                    active: this.isActivePopularCity(item)
                })}
            >
                <a className="btn-link btn-md" onClick={() => this.selectCity(item)}>
                    {item.getName()}
                </a>
            </div>
        ));
    }

    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className="address">
                <div className="address__body">
                    <div className="address__region region">
                        <div className="region__popular-cities popular-cities d-flex flex-wrap">
                            {this.renderPopularCities()}
                        </div>

                        <div className="region__cities">
                            <Autocomplete
                                queryString={this.state.currentCity.getName()}
                                getItemsByQuery={this.getCitiesByName}
                                selectItem={this.selectCity}
                                placeholder={this.stringsResource.enterSettlementName}
                            />
                        </div>

                        <span className="mt-10 d-block color-gray-1">
                            {this.stringsResource.aboutDeliveryLocations}. {this.stringsResource.enterCityNameOrVillage}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

Region.propTypes = {
    popularCities: PropTypes.instanceOf(Array),
    getCitiesByName: PropTypes.func.isRequired,
    selectCity: PropTypes.func.isRequired
};

Region.defaultProps = {
    popularCities: []
};

export default Region;
