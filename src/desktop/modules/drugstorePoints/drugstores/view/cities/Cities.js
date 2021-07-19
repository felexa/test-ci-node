import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import _ from "lodash";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import Strings from "app/core/utilites/strings";

class Cities extends React.Component {
    constructor(props) {
        super(props);

        this.minQuantityCities = 10;

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property strings
         * @type {Strings}
         */
        this.strings = Strings.getInstance();

        this.state = {
            cities: _.cloneDeep(props.cities).slice(0, this.minQuantityCities),
            isCollapsed: true
        };

        this._changeCity = this._changeCity.bind(this);
        this._showAllCities = this._showAllCities.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.cities, this.props.cities)) {
            let cities = _.cloneDeep(this.props.cities);

            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({cities: cities.slice(0, this.minQuantityCities), isCollapsed: true});
        }
    }

    /**
     * @private
     * @method _hasButtonAllCities
     * @returns {boolean}
     */
    _hasButtonAllCities() {
        // eslint-disable-next-line
        return !Boolean(this.props.activeCityAlias);
    }

    /**
     * @private
     * @method _isActiveCity
     * @params alias {string}
     * @returns {boolean}
     */
    _isActiveCity(alias) {
        return this.props.activeCityAlias === alias;
    }

    /**
     * @private
     * @method _getCountCollapsedCities
     * @returns {number}
     */
    _getCountCollapsedCities() {
        return (this.props.cities.length - this.minQuantityCities);
    }

    /**
     * @private
     * @method _buildNameOfShowMoreButton
     * @returns {string}
     */
    _buildNameOfShowMoreButton() {
        return this.strings.writeLine(this.stringsResource.showMoreCities, this._getCountCollapsedCities());
    }

    /**
     * @private
     * @method _buildUrl
     * @params url {string}
     * @returns {string}
     */
    _buildUrl(url) {
        return `${Env.getInstance().getBitrixHost()}${url}/`;
    }

    /**
     * @private
     * @method _changeCity
     * @params e {Object}
     * @returns {Cities}
     */
    _changeCity(e) {
        e.preventDefault();
        let nameAlias = e.target.dataset.alias,
            cityName = e.target.innerText;

        this.props.changeCity(nameAlias, cityName);
        this._collapseCities();

        return this;
    }

    /**
     * @private
     * @method _showAllCities
     * @returns {Cities}
     */
    _showAllCities() {
        this.setState({cities: this.props.cities, isCollapsed: false});

        return this;
    }

    _collapseCities() {
        this.setState({isCollapsed: true});

        return this;
    }

    /**
     * @private
     * @method _renderCities
     * @returns {Array}
     */
    _renderCities() {
        return this.state.cities.map((city, i) => (
            <a
                className={classNames("cities__item text-decoration-none color-black", {active: this._isActiveCity(city.getAlias())})}
                data-alias={city.getAlias()}
                onClick={this._changeCity}
                key={i}
                href={this._buildUrl(city.getUrl())}
            >
                {city.getName()}
            </a>
        ));
    }

    /**
     * @private
     * @method _renderButtonAllCities
     * @returns {React.ReactElement}
     */
    _renderButtonAllCities() {
        return (
            <a
                className="cities__item text-decoration-none color-black active"
                href={this._buildUrl("/pharmacy")}
            >
                {this.stringsResource.allCities}
            </a>
        );
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className={classNames("drugstore__cities", {"drugstore__cities--mt": !this.props.activeCityAlias})}>
                <div className="drugstore__cities-header">
                    <p className="mt-0 mb-16 text-black">{this.stringsResource.showDrugstoresByCity}</p>
                </div>

                <div className="drugstore__cities-body">
                    <div className="d-flex justify-content-start align-items-center flex-wrap">
                        {this._hasButtonAllCities() && this._renderButtonAllCities()}
                        {this._renderCities()}
                        {this.state.isCollapsed && (
                            <button
                                type="button"
                                className="btn-link cities__item color-black"
                                onClick={this._showAllCities}
                            >
                                {this._buildNameOfShowMoreButton()}
                            </button>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}

Cities.propTypes = {
    cities: PropTypes.instanceOf(Array),
    activeCityAlias: PropTypes.string,
    changeCity: PropTypes.func
};

Cities.defaultProps = {
    cities: [],
    activeCityAlias: "",
    changeCity() {}
};

export default Cities;
