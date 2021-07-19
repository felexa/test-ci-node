import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

import Resource from "app/core/resource";
import Env from "app/core/environment";

import DeviceDesktop from "components/deviceDetector/desktop/Detector";
import DeviceMobile from "components/deviceDetector/mobile/Detector";

class DrugstoreItems extends React.Component {
    constructor(props) {
        super(props);

        this.numberDrugstoresForInitialDisplay = 10;

        this.state = {
            drugstores: props.drugstores.slice(0, this.numberDrugstoresForInitialDisplay)
        };

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this._showAllDrugstores = this._showAllDrugstores.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.drugstores, this.props.drugstores)) {
            this._changeDrugstores();
        }
    }

    /**
     * @private
     * @method _isShowButton
     * @returns {boolean}
     */
    _isShowButton() {
        return this.props.drugstores.length > this.state.drugstores.length;
    }

    /**
     * @private
     * @method _setUpdatedDrugstores
     * @returns {DrugstoreItems}
     */
    _changeDrugstores() {
        this.setState({
            drugstores: this.props.drugstores.slice(0, this.numberDrugstoresForInitialDisplay)
        });

        return this;
    }

    /**
     * @private
     * @method _showAllDrugstores
     * @returns {DrugstoreItems}
     */
    _showAllDrugstores() {
        this.setState({
            drugstores: this.props.drugstores
        });

        return this;
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
     * @method _renderTableRow
     * @returns {Array}
     */
    _renderTableRow() {
        return this.state.drugstores.map((drugstore, i) => (
            <tr key={i} className="drugstore-item">
                <td className="drugstore-item__name">{drugstore.getName()}</td>
                <td className="drugstore-item__address">{drugstore.getAddressAsText()}</td>
                <td className="drugstore-item__work-time">{drugstore.getWorkTime()}</td>
                <td className="drugstore-item__phone">{drugstore.getPhone()}</td>
                <td className="drugstore-item__to-drug-store">
                    <a
                        className="btn-default btn-sm"
                        href={this._buildUrl(drugstore.getUrl())}
                    >
                        {this.stringsResource.lookAt}
                    </a>
                </td>
            </tr>
        ));
    }

    /**
     * @private
     * @method _renderDrugstoreItems
     * @returns {Array}
     */
    _renderDrugstoreItems() {
        return this.state.drugstores.map((drugstore, i) => (
            <div className="drugstore-item drugstore-item--mobile" key={i}>
                <p><a href={this._buildUrl(drugstore.getUrl())} className="drugstore-item-name text-decoration-none">{drugstore.getName()}</a></p>
                <p>{drugstore.getAddressAsText()}</p>
                <p>{drugstore.getWorkTime()}</p>
                <p>{drugstore.getPhone()}</p>
            </div>
        ));
    }

    /**
     * @private
     * @method _renderShowMoreButton
     * @returns {React.ReactElement}
     */
    _renderShowMoreButton() {
        return (
            <div className="drugstore__show-more d-flex justify-content-center">
                <button
                    type="button"
                    className="reset-btn-styles btn-md text-pink text-uppercase cursor-pointer"
                    onClick={this._showAllDrugstores}
                >
                    {this.stringsResource.show.all}
                </button>
            </div>
        );
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="drugstore-items">
                <DeviceDesktop>
                    <table className="table">
                        <thead>
                            <tr className="drugstore-item">
                                <th>{this.stringsResource.drugstoresList}</th>
                                <th>{this.stringsResource.address}</th>
                                <th>{this.stringsResource.workTime}</th>
                                <th>{this.stringsResource.phone}</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {this._renderTableRow()}
                        </tbody>
                    </table>
                    {this._isShowButton() && this._renderShowMoreButton()}
                </DeviceDesktop>

                <DeviceMobile>
                    {this._renderDrugstoreItems()}
                    {this._isShowButton() && this._renderShowMoreButton()}
                </DeviceMobile>
            </section>
        );
    }
}

DrugstoreItems.propTypes = {
    drugstores: PropTypes.instanceOf(Array)
};

DrugstoreItems.defaultProps = {
    drugstores: []
};

export default DrugstoreItems;
