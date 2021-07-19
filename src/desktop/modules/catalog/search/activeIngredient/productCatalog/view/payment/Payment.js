/* eslint-disable max-len */
import React from "react";
// import PropTypes from "prop-types";

class Payment extends React.Component {
    /**
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className="payment mb-24 rounded-10">
                <p><span className="f-weight-5">Оплата:</span> Наличными при получении, оплата картой на сайте, наложенный платеж</p>
            </div>
        );
    }
}

Payment.propTypes = {};

Payment.defaultProps = {};

export default Payment;
