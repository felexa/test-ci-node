import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Header from "./header/Header";
import Rubrics from "./rubrics/Rubrics";

import styles from "../styles/main.module.scss";

class Promo extends React.Component {
    constructor(props) {
        super(props);

        this.model = props.options.model;

        this._addToBasket = this._addToBasket.bind(this);
    }

    /**
     * @private
     * @method _addToBasket
     * @param product {Product}
     * @param success {Function}
     * @param error {Function}
     * @returns {Product}
     */
    _addToBasket(product, success, error) {
        this.model.addToBasket(
            product, () => {
                success();
            },
            () => {
                error();
            }
        );

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.Element}
     */
    render() {
        return (
            <section className="promo">
                <style jsx>
                    {styles}
                </style>

                <Header />

                <div className="promo__body">
                    <Rubrics
                        items={this.props.options.initialData.rubrics}
                        addToBasket={this._addToBasket}
                    />
                </div>
            </section>
        );
    }
}

Promo.propTypes = {
    options: PropTypes.instanceOf(Object)
};

Promo.defaultProps = {
    options: {}
};

export default Promo;
