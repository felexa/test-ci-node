/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Invite from "desktop/modules/landings/employeeDiscount/view/invite/Invite";

class Discount extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    render() {
        return (
            <section className="section discount">
                <div className="container-fluid">
                    <div className="d-lg-flex justify-content-between">
                        <div className="discount__left-col">
                            <h1 className="discount__title">
                                {this.HTMLResource.employeeDiscount.discountForEmployees}
                            </h1>

                            <div className="discount__items">
                                <div className="item d-flex align-items-center">
                                    <div className="item__preview d-flex align-items-center justify-content-center">
                                        <img
                                            src={this.Resource.links.icons.hotSale}
                                            alt="preview"
                                            width="38"
                                            height="38"
                                        />
                                    </div>

                                    <div className="item__description">
                                        <p dangerouslySetInnerHTML={{__html: this.HTMLResource.employeeDiscount.advantages.cashback}} />
                                    </div>
                                </div>

                                <div className="item d-flex align-items-center">
                                    <div className="item__preview d-flex align-items-center justify-content-center">
                                        <img
                                            src={this.Resource.links.icons.group}
                                            alt="preview"
                                            width="38"
                                            height="38"
                                        />
                                    </div>

                                    <div className="item__description">
                                        <p dangerouslySetInnerHTML={{__html: this.HTMLResource.employeeDiscount.advantages.bonusForFriend}} />
                                    </div>
                                </div>

                                <div className="item d-flex align-items-center">
                                    <div className="item__preview d-flex align-items-center justify-content-center">
                                        <img
                                            src={this.Resource.links.icons.deliveryBox}
                                            alt="preview"
                                            width="38"
                                            height="38"
                                        />
                                    </div>

                                    <div className="item__description">
                                        <p dangerouslySetInnerHTML={{__html: this.HTMLResource.employeeDiscount.advantages.freeDelivery}} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="discount__right-col">
                            <Invite inviter={this.props.inviter} confirm={this.props.confirm} />
                        </div>
                    </div>

                    <div className="discount__info-block bg-white new-super-box-shadow color-black text-center">
                        <p>{this.HTMLResource.employeeDiscount.infoBlock.employeeCapabilities}</p>
                        <p>{this.HTMLResource.employeeDiscount.infoBlock.deliveryTerms}</p>
                    </div>
                </div>
            </section>
        );
    }
}

Discount.propTypes = {
    inviter: PropTypes.instanceOf(Object),
    confirm: PropTypes.func
};

Discount.defaultProps = {
    inviter: null,
    confirm: () => {}
};

export default Discount;
