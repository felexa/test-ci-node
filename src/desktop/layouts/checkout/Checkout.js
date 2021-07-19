/* eslint-disable react/prop-types */
import React from "react";

class Checkout extends React.Component {
    render() {
        return <section>{this.props.children}</section>;
    }
}

export default Checkout;
