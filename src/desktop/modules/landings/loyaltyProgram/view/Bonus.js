import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import MicroDataWebPage from "components/microData/WebPage";

import Banner from "./banner/Banner";
import GetBonus from "./getBonus/GetBonus";
import SpendBonus from "./spendBonus/SpendBonus";
import PromoCode from "./promoCode/PromoCode";
import FAQ from "./faq/FAQ";
import Lawyer from "./lawyer/Lawyer";

import styles from "../styles/main.module.scss";

class Bonus extends React.Component {
    constructor(props) {
        super(props);

        this.faq = props.options.initialData.faq;
    }

    /**
     * @private
     * @method _getPageInfo
     * @returns {PageInfo}
     */
    _getPageInfo() {
        // eslint-disable-next-line react/prop-types
        return this.props.options.initialData.pageInfo;
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="loyalty-program">
                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                <style jsx>
                    {styles}
                </style>

                <div className="loyalty-program__header">
                    <Banner />
                </div>

                <div className="loyalty-program__body">
                    <GetBonus />

                    <SpendBonus />

                    <PromoCode />

                    <FAQ faq={this.faq} />

                    <Lawyer />
                </div>
            </section>
        );
    }
}

Bonus.propTypes = {
    options: PropTypes.instanceOf(Object).isRequired
};

export default Bonus;
