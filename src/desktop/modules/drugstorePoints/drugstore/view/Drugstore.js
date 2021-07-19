import React from "react";
import PropTypes from "prop-types";
import dynamic from 'next/dynamic';

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import DeviceDetector from "app/core/utilites/deviceDetector";

import DeviceMobile from "components/deviceDetector/mobile/Detector";
import DeviceDesktop from "components/deviceDetector/desktop/Detector";

import Properties from "./properties/Properties";

import styles from "../styles/main.module.scss";

let Location = dynamic(
    () => import("components/location/Location"),
    { ssr: false }
);

class Drugstore extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property _deviceDetector
         * @type {DeviceDetector}
         */
        this._deviceDetector = DeviceDetector.getInstance();
    }

    /**
     * @private
     * @method _getDrugstore
     * @returns {Drugstores[]}
     */
    _getDrugstore() {
        return this.props.options.initialData.drugstore;
    }

    /**
     * @private
     * @method _getMarkers
     * @returns {Marker[]}
     */
    _getMarkers() {
        return this.props.options.initialData.markers;
    }

    /**
     * @private
     * @method _buildTitle
     * @returns {string}
     */
    _buildTitle() {
        // eslint-disable-next-line max-len
        return `${this.stringsResource.selfDeliveryPoint} ${this._getDrugstore().getName()}, ${this._getDrugstore().getAddressAsText()}`;
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className={classNames("drugstore-card", {"drugstore-card--mobile": this._deviceDetector.isMobile()})}>
                <style jsx>
                    {styles}
                </style>

                <DeviceDesktop>
                    <header className="drugstore-card__header">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <h1 className="drugstore-card__name text-black mb-24">
                                        {this._buildTitle()}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </header>
                </DeviceDesktop>

                <div className="drugstore-card__body">
                    <div className="container-fluid">
                        <div className="row row--no-horizontal-sm-margins">
                            <div className="col">
                                <div className="adaptive-content bg-white rounded-16 new-super-box-shadow">
                                    <DeviceMobile>
                                        <h1 className="drugstore-card__name text-black mb-24">
                                            {this._buildTitle()}
                                        </h1>
                                    </DeviceMobile>

                                    <div className="d-flex justify-content-between">
                                        <div className="drugstore-card__description">
                                            <Properties drugstore={this._getDrugstore()} />

                                            <div className="drugstore-card__how-buy text-black">
                                                <p className="drugstore-card__how-buy-title">
                                                    {this.stringsResource.howPlaceOrderToDrugstore}?
                                                </p>

                                                <ul>
                                                    <li>
                                                        <p className="d-flex align-items-center">
                                                            <span className="badge">1</span>
                                                            <span>{this.stringsResource.findAllDrugsYouNeed}</span>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p className="d-flex align-items-center">
                                                            <span className="badge">2</span>
                                                            <span>
                                                                {this.stringsResource.addToCartAndStartCheckout}
                                                            </span>
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p className="d-flex align-items-center">
                                                            <span className="badge">3</span>
                                                            <span>
                                                                {this.stringsResource.chooseDrugstoreInDeliveryMethods}
                                                            </span>
                                                        </p>
                                                    </li>
                                                </ul>
                                                <p className="drugstore-card__how-buy-phone-order f-weight-5">
                                                    {this.stringsResource.orYouCanPlaceAnOrderByPhone}
                                                    <span className="whitespace-nowrap"> — 0800 30 22 44</span>
                                                </p>
                                            </div>

                                            <div className="mt-32">
                                                <span className="drugstore-card__location f-weight-5">
                                                    {this.stringsResource.howToGetThere}?
                                                </span>

                                                <div className="mt-10">
                                                    <Location markers={this._getMarkers()} nameAsLink={false} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="drugstore-card__photo d-none d-md-flex justify-content-end">
                                            <div className="drugstore-card__photo-preview">
                                                <img
                                                    src={this._getDrugstore().getPreview().getLarge()}
                                                    alt={this._getDrugstore().getPreview().getAlt()}
                                                    title={this._getDrugstore().getPreview().getTitle()}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Drugstore.propTypes = {
    options: PropTypes.instanceOf(Object).isRequired
};

export default Drugstore;
