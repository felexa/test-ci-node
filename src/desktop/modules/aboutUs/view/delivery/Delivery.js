import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import PharmacyCourier from "./pharmacyCourier/main";
import UkrPost from "./ukrPost/main";
import NewPost from "./newPost/main";
// import Justin from "./justin/main";
// import Meest from "./meest/main";
import SelfDelivery from "./selfDelivery/main";
import PaymentReturn from "./paymentReturn/main";

class Delivery extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @private
     * @method _getFreeDeliveryLastDate
     * @returns {String}
     */
    _getFreeDeliveryLastDate() {
        return this.props.freeDeliveryLastDate;
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="delivery">
                <div className="delivery__body">
                    <div
                        dangerouslySetInnerHTML={{__html: this.HTMLResource.about.delivery.warning}}
                        className="delivery__warning alert-danger"
                    />

                    <PharmacyCourier freeDeliveryLastDate={this._getFreeDeliveryLastDate()} />
                    <UkrPost freeDeliveryLastDate={this._getFreeDeliveryLastDate()} />
                    <NewPost freeDeliveryLastDate={this._getFreeDeliveryLastDate()} />
                    {/* <Justin freeDeliveryLastDate={this._getFreeDeliveryLastDate()} />
                    <Meest freeDeliveryLastDate={this._getFreeDeliveryLastDate()} /> */}
                    <SelfDelivery />
                    <PaymentReturn />

                    <br />
                    <sub>
                        {this.HTMLResource.about.delivery.note}
                    </sub>
                </div>
            </div>
        );
    }
}

Delivery.propTypes = {
    freeDeliveryLastDate: PropTypes.string.isRequired
};

export default Delivery;
