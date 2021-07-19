import React from "react";
import PropTypes from "prop-types";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import {Marker, Popup} from "react-leaflet";
import L from 'leaflet';

import Resource from "app/core/resource";
import Env from "app/core/environment";
import Strings from "app/core/utilites/strings";

import Map from 'components/map/Map';

class Location extends React.Component {
    constructor(props) {
        super(props);

        this.mapApi = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

        this.drugstoreName = {
            ownedByOurCompany: "аптека24"
        };

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

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
    }

    /**
     * @private
     * @method _getIconMarkerByDrugstoreName
     * @params name {string}
     * @returns {Object}
     */
    _getIconMarkerByDrugstoreName(name = "") {
        let marker = this._buildPartnerMarker();

        if (name.toLowerCase() === this.drugstoreName.ownedByOurCompany) {
            marker = this._buildApteka24Marker();
        }

        return marker;
    }

    /**
     * @private
     * @method _getAverageValue
     * @params listOfCoordinates {Array}
     * @returns {number}
     */
    _getAverageValue(listOfCoordinates) {
        return (Math.min(...listOfCoordinates) + Math.max(...listOfCoordinates)) / 2;
    }

    /**
     * @private
     * @method _getCenterMapCoordinates
     * @returns {Array}
     */
    _getCenterMapCoordinates() {
        let allPointsCoordination = this._getAllPointsCoordination();

        // eslint-disable-next-line max-len
        return [this._getAverageValue(allPointsCoordination.latitude), this._getAverageValue(allPointsCoordination.longitude)];
    }

    /**
     * @private
     * @method _getAllPointsCoordination
     * @returns {Object}
     */
    _getAllPointsCoordination() {
        let latitudeList = [],
            longitudeList = [];

        this.props.markers.forEach((drugstore) => {
            latitudeList.push(drugstore.getLatitude());
            longitudeList.push(drugstore.getLongitude());
        });

        return ({
            latitude: latitudeList.length === 0 ? [0] : latitudeList,
            longitude: longitudeList.length === 0 ? [0] : longitudeList
        });
    }

    /**
     * @private
     * @method _createClusterIcon
     * @params cluster {Object}
     * @returns {Object}
     */
    _buildClusterIcon(cluster) {
        return L.divIcon({
            html: `<span>${cluster.getChildCount()}</span>`,
            className: 'marker-cluster',
            iconSize: L.point(25, 25, true)
        });
    }

    /**
     * @private
     * @method _buildCluster
     * @returns {React.ReactElement}
     */
    _buildCluster() {
        return (
            <MarkerClusterGroup
                iconCreateFunction={this._buildClusterIcon}
                showCoverageOnHover={false}
            >
                {this._renderMarkers()}
            </MarkerClusterGroup>
        );
    }

    /**
     * @private
     * @method _buildApteka24Marker
     * @returns {Object}
     */
    _buildApteka24Marker() {
        return new L.Icon({
            iconUrl: this.Resource.links.icons.pin.apteka24,
            iconRetinaUrl: this.Resource.links.icons.pin.apteka24,
            iconSize: new L.Point(30, 30),
            className: 'marker-icon'
        });
    }

    _buildPartnerMarker() {
        return new L.Icon({
            iconUrl: this.Resource.links.icons.pin.partner,
            iconRetinaUrl: this.Resource.links.icons.pin.partner,
            iconSize: new L.Point(30, 30),
            className: 'marker-icon'
        });
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
     * @method _renderMarkers
     * @returns {Array}
     */
    _renderMarkers() {
        return this.props.markers.map((item, i) => (
            <Marker
                key={i}
                icon={this._getIconMarkerByDrugstoreName(item.getName())}
                position={[item.getLatitude(), item.getLongitude()]}
            >
                <Popup>
                    <p className="leaflet-popup-item leaflet-popup-item--name">
                        {this.props.nameAsLink && (
                        <a
                            href={this._buildUrl(item.getUrl())}
                            className="text-decoration-none"
                        >
                            {item.getName()}, {item.getAddressAsText()}
                        </a>
                        )}

                        {!this.props.nameAsLink && (
                            <span>{item.getName()}, {item.getAddressAsText()}</span>
                        )}
                    </p>
                    <p className="leaflet-popup-item leaflet-popup-item--workTime">{item.getWorkTime()}</p>
                    <p className="leaflet-popup-item leaflet-popup-item--phone">{item.getPhone()}</p>
                </Popup>
            </Marker>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section className="location-unit">
                <div className="location-unit__map">
                    {!this.props.shouldChangeCityOnMap && (
                        <Map
                            cluster={this._buildCluster()}
                            mapApi={this.mapApi}
                            centerCoordinates={this._getCenterMapCoordinates()}
                            zoomSize={this.props.zoomSize}
                        />
                    )}
                </div>

                <div className="location-unit__legend">
                    <div className="location-unit__legend-item">
                        <span className="marker-cluster marker-cluster--legend mr-16">24</span>
                        <span>{this.stringsResource.severalDrugstores}</span>
                    </div>

                    <div className="location-unit__legend-item">
                        <img src={this.Resource.links.icons.pin.apteka24} alt="" className="mr-8" />
                        <span>apteka24.ua</span>
                    </div>

                    <div className="location-unit__legend-item">
                        <img src={this.Resource.links.icons.pin.partner} alt="" className="mr-8" />
                        <span>{this.stringsResource.partnerDrugstores}</span>
                    </div>
                </div>
            </section>
        );
    }
}

Location.propTypes = {
    markers: PropTypes.instanceOf(Array),
    shouldChangeCityOnMap: PropTypes.bool,
    zoomSize: PropTypes.number,
    nameAsLink: PropTypes.bool
};

Location.defaultProps = {
    markers: [],
    shouldChangeCityOnMap: false,
    zoomSize: 10,
    nameAsLink: true
};

export default Location;
