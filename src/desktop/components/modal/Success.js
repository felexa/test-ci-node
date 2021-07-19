import React from "react";
import PropTypes from "prop-types";

class Success extends React.Component {
    render() {
        return (
            <div className="text-center mb-24">
                <img
                    src="https://s3-eu-west-1.amazonaws.com/i.apteka24.ua/temp-images/thank-comment-.svg"
                    alt="Спасибо за заказ!"
                    width="141"
                    height="141"
                />
                <p className="text-size--h1 text-black" style={{fontWeight: 500}}>
                    {this.props.title}
                </p>
                <p className="text-size--h4 text-black" style={{fontWeight: 400}}>
                    {this.props.description}
                </p>
            </div>
        );
    }
}

Success.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
};

export default Success;
