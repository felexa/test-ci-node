import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class Sale extends React.Component {
    constructor(props) {
        super(props);

        this.classes = {
            sale: true,
            [props.className]: true
        };
    }

    /**
     * @method hasValue
     * @return {boolean}
     */
    hasValue() {
        return Boolean(this.props.value);
    }

    /**
     * @method hasSale
     * @return {boolean}
     */
    hasSale() {
        return this.hasValue() || Boolean(this.props.percent);
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        return this.hasSale() && (
            <div className={classNames(this.classes)}>
                <div className="sale__body d-flex">
                    <div className={classNames("sale__relative", { "sale__relative-only": !this.hasValue() })}>
                        <span className="sale__percent text-white">-{this.props.percent}%</span>
                    </div>

                    {this.hasValue() && (
                        <div className="sale__absolute">
                            <span className="sale__title text-black">{this.props.title}</span>
                            <span className="sale__value text-red">{this.props.value}</span>
                            <span className="sale__currency text-red">{this.props.currency}</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

Sale.propTypes = {
    percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    title: PropTypes.string,
    currency: PropTypes.string
};

Sale.defaultProps = {
    percent: 0,
    value: 0,
    className: "",
    title: "Скидка",
    currency: "грн"
};

export default Sale;
