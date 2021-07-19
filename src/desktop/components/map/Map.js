import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import {MapContainer, TileLayer} from 'react-leaflet';

class Map extends React.Component {
    /**
     * @private
     * @method _hasMarkers
     * @returns {boolean}
     */
    _hasMarkers() {
        return Boolean(this.props.marker.length) || this._isСlusterUsedOnMap();
    }

    /**
     * @private
     * @method _isСlusterUsedOnMap
     * @returns {boolean}
     */
    _isСlusterUsedOnMap() {
        return !_.isEmpty(this.props.cluster);
    }

    /**
     * @private
     * @method _getCenterCoordinates
     * @returns {Array}
     */
    _getCenterCoordinates() {
        return this.props.centerCoordinates;
    }

    /**
     * @private
     * @method _getMapApi
     * @returns {string}
     */
    _getMapApi() {
        return this.props.mapApi;
    }

    /**
     * @private
     * @method _getMarkers
     * @returns {Object | Array}
     */
    _getMarkers() {
        let result = this.props.marker;

        if (this._isСlusterUsedOnMap()) {
            result = this.props.cluster;
        }

        return result;
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <MapContainer
                tap={false}
                center={this._getCenterCoordinates()}
                zoom={this.props.zoomSize}
                scrollWheelZoom={false}
                //zoomControl={false} отключение кнопок зума(оставил включенными,ибо взаимодействовать с картой сложно)
            >
                <TileLayer url={this._getMapApi()} />
                {this._hasMarkers() && this._getMarkers()}
            </MapContainer>
        );
    }
}

Map.propTypes = {
    centerCoordinates: PropTypes.arrayOf(PropTypes.number),
    marker: PropTypes.instanceOf(Array),
    cluster: PropTypes.instanceOf(Object),
    mapApi: PropTypes.string,
    zoomSize: PropTypes.number
};

Map.defaultProps = {
    centerCoordinates: [0, 0],
    marker: [],
    cluster: {},
    mapApi: "",
    zoomSize: 10
};

export default Map;
