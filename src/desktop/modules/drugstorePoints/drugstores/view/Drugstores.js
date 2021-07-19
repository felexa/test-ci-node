import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import dynamic from 'next/dynamic';

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import ModalDialogService from "app/core/services/modalDialog";
import Env from "app/core/environment";
import Resource from "app/core/resource";

import DeviceMobile from "components/deviceDetector/mobile/Detector";
import DeviceDesktop from "components/deviceDetector/desktop/Detector";
import Region from "components/address/region/Region";

import DrugstoreItems from "./drugstoreItems/DrugstoreItems";
import Search from "./search/Search";
import Cities from "./cities/Cities";

import styles from "../styles/main.module.scss";

let Location = dynamic(
    () => import('components/location/Location'),
    { ssr: false }
);

class Drugstores extends React.Component {
    constructor(props) {
        super(props);

        this.mobileZoomSise = 4;
        this.desktopZoomSize = 6;

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {
            markers: props.options.initialData.markers,
            drugstores: props.options.initialData.drugstores,
            activeMapView: false,
            shouldChangeCityOnMap: false,
            activeCityAlias: props.options.initialData.cityAlias,
            activeCityName: props.options.initialData.cityName || this.stringsResource.select.toLowerCase(),
            loading: false
        };

        /**
         * @property modalDialogService
         * @type {ModalDialog}
         */
        this.modalDialogService = ModalDialogService.getInstance();

        this._changeCity = this._changeCity.bind(this);
        this._toggleView = this._toggleView.bind(this);
        this._setDrugstores = this._setDrugstores.bind(this);
        this._changeLocation = this._changeLocation.bind(this);
        this._getDrugstoresByQuery = this._getDrugstoresByQuery.bind(this);
        this._getCitiesByName = this._getCitiesByName.bind(this);
        this._selectCity = this._selectCity.bind(this);
        this._sortCities = this._sortCities.bind(this);
    }

    /**
     * @private
     * @method _hasDrugstoreItems
     * @returns {boolean}
     */
    _hasDrugstoreItems() {
        return Boolean(this.state.drugstores.length);
    }

    /**
     * @private
     * @method _hasDrugstoreSearchAndItems
     * @returns {boolean}
     */
    _hasDrugstoreSearchAndItems() {
        return Boolean(this.state.activeCityAlias);
    }

    /**
     * @private
     * @method _toggleView
     * @param state {boolean}
     * @returns {Drugstores}
     */
    _toggleView(state) {
        this.setState(() => ({
            activeMapView: state
        }));

        return this;
    }

    /**
     * @method _toggleLoader
     * @param state {boolean}
     * @returns {Instruction}
     * @private
     */
    _toggleLoader(state) {
        this.setState({
            loading: state
        });

        return this;
    }

    /**
     * @private
     * @method _getCitiesByName
     * @param name {string}
     * @param callback {Function}
     * @returns {Drugstores}
     */
    _getCitiesByName(name, callback) {
        this._getPresenter().getCitiesByName(name, callback);

        return this;
    }

    /**
     * @private
     * @method _sortCities
     * @returns {City[]}
     */
    _sortCities() {
        let cities = [];

        this.props.options.initialData.cities.forEach((city) => {
            // eslint-disable-next-line no-unused-expressions
            city.getAlias() === this.state.activeCityAlias ?
                cities.unshift(city) :
                cities.push(city);
        });

        return cities;
    }

    /**
     * @private
     * @method _getDrugstoresByCityAlias
     * @params cityName {string}
     * @returns {Drugstores}
     */
    _getDrugstoresByCityAlias(cityAlias) {
        this._changeCityOnMap(true);
        this._toggleLoader(true);

        this._getPresenter().getDrugstoresByCityAlias(
            cityAlias,
            this._setDrugstores,
            () => this._toggleLoader(false)
        );

        return this;
    }

    /**
     * @private
     * @method _getDrugstoresByQuery
     * @params searchQuery {string}
     * @returns {Drugstores}
     */
    _getDrugstoresByQuery(searchQuery) {
        this._toggleLoader(true);

        this._getPresenter().getDrugstoresByQuery(
            this.state.activeCityAlias,
            searchQuery,
            this._setDrugstores,
            () => this._toggleLoader(false)
        );

        return this;
    }

    /**
     * @private
     * @method _getPresenter
     * @return {Presenter}
     */
    _getPresenter() {
        return this.props.options.presenter;
    }

    /**
     * @private
     * @method _setDrugstores
     * @param drugstores {Drugstores[]}
     * @param markers {Markers[]}
     * @returns {Drugstores}
     */
    _setDrugstores(drugstores, markers) {
        this.setState({drugstores, markers, shouldChangeCityOnMap: false});
        this._toggleLoader(false);

        return this;
    }

    /**
     * @private
     * @method _getZoomSize
     * @params zoomSize {number}
     * @returns {number}
     */
    _getZoomSize(zoomSize) {
        let result = zoomSize;

        // eslint-disable-next-line no-extra-boolean-cast
        if (Boolean(this.state.activeCityAlias)) {
            result = 10;
        }

        return result;
    }

    /**
     * @private
     * @method _changeCityOnMap
     * @params state {boolean}
     * @returns {Drugstores}
     */
    _changeCityOnMap(state) {
        this.setState({shouldChangeCityOnMap: state});

        return this;
    }

    /**
     * @private
     * @method _changeLocation
     * @param cityAlias {string}
     * @param cityName {string}
     * @returns {Drugstores}
     */
    _changeLocation(cityAlias, cityName) {
        this.setState({activeCityAlias: cityAlias, activeCityName: cityName});
        this._getDrugstoresByCityAlias(cityAlias);

        return this;
    }

    /**
     * @private
     * @method _changeCity
     * @returns {Product}
     */
    _changeCity() {
        this.modalDialogService.open({
            title: this.stringsResource.chooseYourCity,
            confirm: {
                title: this.stringsResource.apply,
                callback: () => {}
            },
            body: (
                <Region
                    popularCities={this.props.options.initialData.cities.slice(0, 5)}
                    selectCity={this._selectCity}
                    getCitiesByName={this._getCitiesByName}
                />
            ),
            className: "modal-change-city"
        });

        return this;
    }

    /**
     * @private
     * @method _selectCity
     * @param city {City}
     * @returns {Drugstores}
     */
    _selectCity(city) {
        this._changeLocation(city.getAlias(), city.getName());

        return this;
    }

    /**
     * @private
     * @method _renderTitle
     * @returns {React.ReactElement}
     */
    _renderTitle() {
        return (
            <>
                <h1 className="drugstores__name text-black mb-24">
                    {this.stringsResource.freeSelfDeliveryFromDrugstores}
                </h1>

                <div className="drugstores__your-city text-black">
                    <span className="drugstores__your-city-label mr-6">{this.stringsResource.yourCity}:</span>
                    <span
                        className="drugstores__your-city-name f-weight-5 link-bordered color-link"
                        onClick={this._changeCity}
                    >
                        {this.state.activeCityName}
                    </span>
                </div>
            </>
        );
    }

    /**
     * @private
     * @method _renderItemsAndSearch
     * @returns {React.ReactElement}
     */
    _renderItemsAndSearch() {
        return (
            <>
                <Search getItemsByQuery={this._getDrugstoresByQuery} />
                {this._hasDrugstoreItems() && (
                    <DrugstoreItems drugstores={this.state.drugstores} />
                )}
                {!this._hasDrugstoreItems() && (
                    <div className="drugstores__search-results">{this.stringsResource.emptySearchResult}</div>
                )}
            </>
        );
    }

    /**
     * @private
     * @method _renderCitiesAndMap
     * @returns {React.ReactElement}
     */
    _renderCitiesAndMap(zoomSize) {
        return (
            <>
                <Cities
                    cities={this._sortCities()}
                    activeCityAlias={this.state.activeCityAlias}
                    changeCity={this._changeLocation}
                />

                <div className="location">
                    <Location
                        markers={this.state.markers.slice(0, 862)}
                        //reducing the number of markers is necessary for the library react-leaflet to work normally
                        shouldChangeCityOnMap={this.state.shouldChangeCityOnMap}
                        zoomSize={this._getZoomSize(zoomSize)}
                    />
                </div>
            </>
        );
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <>
                <style jsx>
                    {styles}
                </style>

                <DeviceMobile>
                    <section className={classNames("drugstores drugstores--mobile adaptive-content bg-white rounded-16 new-super-box-shadow overflow-hidden", {loading: this.state.loading})}>
                        <header className="drugstores__header">
                            <div className="container-fluid">
                                <div className="row row--no-horizontal-sm-margins">
                                    <div className="col">
                                        {this._renderTitle()}

                                        {this._hasDrugstoreSearchAndItems() && (
                                            <div className="drugstores__action-bar">
                                                <button
                                                    type="button"
                                                    className={classNames("btn-link btn-md", {active: !this.state.activeMapView})}
                                                    onClick={() => this._toggleView(false)}
                                                >
                                                    {(this.stringsResource.asList).toLowerCase()}
                                                </button>

                                                <button
                                                    type="button"
                                                    className={classNames("btn-link btn-md", {active: this.state.activeMapView})}
                                                    onClick={() => this._toggleView(true)}
                                                >
                                                    {(this.stringsResource.asMap).toLowerCase()}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div className="drugstores__body">
                            {(this.state.activeMapView || !this._hasDrugstoreSearchAndItems()) && (
                                <div className="container-fluid">
                                    <div className="row row--no-horizontal-sm-margins">
                                        <div className="col">
                                            {this._renderCitiesAndMap(this.mobileZoomSise)}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {(!this.state.activeMapView && this._hasDrugstoreSearchAndItems()) && (
                                <div className="container-fluid">
                                    <div className="row row--no-horizontal-sm-margins">
                                        <div className="col">
                                            {this._renderItemsAndSearch()}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </DeviceMobile>

                <DeviceDesktop>
                    <section className="drugstores">
                        <header className="drugstores__header">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <div className="d-flex flex-column flex-md-row align-items-baseline">
                                            {this._renderTitle()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div className="drugstores__body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <div className={classNames("adaptive-content bg-white rounded-16 new-super-box-shadow overflow-hidden", {loading: this.state.loading})}>
                                            {this._renderCitiesAndMap(this.desktopZoomSize)}
                                            {this._hasDrugstoreSearchAndItems() && this._renderItemsAndSearch()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </DeviceDesktop>
            </>
        );
    }
}

Drugstores.propTypes = {
    options: PropTypes.instanceOf(Object).isRequired
};

export default Drugstores;
