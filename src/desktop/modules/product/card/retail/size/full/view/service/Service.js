/* eslint-disable max-len,react/jsx-no-target-blank */
import React from "react";
import PropTypes from "prop-types";

import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Enum from "app/core/utilites/enum/tab";

import Tabs from "app/core/components/tabs/Tabs";

import DeviceDesktop from "components/deviceDetector/desktop/Detector";
import DeviceMobile from "components/deviceDetector/mobile/Detector";
import Panel from "components/panel/Panel";

import Payment from "./payment/Payment";
import Warranty from "./warranty/Warranty";
import ReturnPolicy from "./returnPolicy/ReturnPolicy";

class Service extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {
            activeTabName: Enum.getInstance().getPaymentAsValue()
        };

        this.services = new Map();

        this.tabNameEnum = Enum.getInstance();

        this._buildServices();

        this._changeTab = this._changeTab.bind(this);
    }

    /**
     * @private
     * @method _hasReturnPolicy
     * @returns {boolean}
     */
    _hasReturnPolicy() {
        let termsOfReturns = this._getProduct().getReturnPolicy();

        return Boolean(termsOfReturns.getTitle() && termsOfReturns.getDescription());
    }

    /**
     * @private
     * @method _buildServices
     * @returns {Service}
     */
    _buildServices() {
        this.services
            .set(this.tabNameEnum.getPaymentAsValue(), {
                title: this.stringsResource.payment,
                description: this._renderPayment()
            })
            .set(this.tabNameEnum.getWarrantyAsValue(), {
                title: this.stringsResource.warranty,
                description: this._renderWarranty()
            });

        if (this._hasReturnPolicy()) {
            this.services.set(this.tabNameEnum.getReturnPolicyAsValue(), {
                title: this.stringsResource.returnConditions,
                description: this._renderReturnPolicy()
            });
        }

        return this;
    }

    /**
     * @private
     * @method _buildTab
     * @param tabName {string}
     * @returns {Object}
     */
    _buildTab(tabName) {
        let {title, description} = this.services.get(tabName);

        return {
            name: tabName,
            description: title,
            component: description
        };
    }

    /**
     * @private
     * @method _buildTabs
     * @returns {[Object]}
     */
    _buildTabs() {
        let tabs = [
            this._buildTab(this.tabNameEnum.getPaymentAsValue()),
            this._buildTab(this.tabNameEnum.getWarrantyAsValue())
        ];

        if (this.services.has(this.tabNameEnum.getReturnPolicyAsValue())) {
            tabs.push(this._buildTab(this.tabNameEnum.getReturnPolicyAsValue()));
        }

        return tabs;
    }

    /**
     * @private
     * @method _renderPayment
     * @returns {string}
     */
    _renderPayment() {
        return <Payment />;
    }

    /**
     * @private
     * @method _renderWarranty
     * @returns {string}
     */
    _renderWarranty() {
        return <Warranty showGuarantee={this.props.showGuarantee} />;
    }

    /**
     * @private
     * @method _renderReturnPolicy
     * @returns {string}
     */
    _renderReturnPolicy() {
        return <ReturnPolicy policy={this._getProduct().getReturnPolicy()} />;
    }

    /**
     * @private
     * @method _changeTab
     * @param tab
     * @returns {Service}
     */
    _changeTab(tab) {
        this.setState({
            activeTabName: tab.name
        });

        return this;
    }

    /**
     * @private
     * @method  _getCurrentTabName
     * @returns {string}
     */
    _getActiveTabName() {
        return this.state.activeTabName;
    }

    /**
     * @private
     * @method _getProduct
     * @returns {Object}
     */
    _getProduct() {
        return this.props.product;
    }

    /**
     * @private
     * @method _getTabs
     * @returns {[string]}
     */
    _getTabs() {
        return this._buildTabs().map((tab) => ({
            ...tab,
            active: tab.name === this.state.activeTabName
        }));
    }

    /**
     * @private
     * @method _renderMobilePanels
     * @returns {[string]}
     */
    _renderMobilePanels() {
        return [...this.services.values()].map((item, i) => (
            <Panel title={item.title} className="mt-24" key={i}>{item.description}</Panel>
        ));
    }

    render() {
        return (
            <div className={classNames("product-card__service service", this.props.className)}>
                <DeviceDesktop>
                    <div className="base-border rounded-10">
                        <Tabs horizontal items={this._getTabs()} onChange={this._changeTab} />
                    </div>
                </DeviceDesktop>

                <DeviceMobile>
                    {this._renderMobilePanels()}
                </DeviceMobile>
            </div>
        );
    }
}

Service.propTypes = {
    className: PropTypes.string,
    product: PropTypes.instanceOf(Object).isRequired,
    showGuarantee: PropTypes.func
};

Service.defaultProps = {
    className: "",
    showGuarantee() {}
};

export default Service;
