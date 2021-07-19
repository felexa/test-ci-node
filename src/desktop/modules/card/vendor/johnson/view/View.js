import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import ProductRubric from "components/rubric/product/Rubric";
import MicroDataWebPage from "components/microData/WebPage";

import Company from "desktop/modules/card/vendor/base/view/company/Company";
import AboutCompany from "desktop/modules/card/vendor/base/view/about/AboutCompany";
import Trademarks from "desktop/modules/card/vendor/base/view/trademarks/Trademarks";
import Categories from "desktop/modules/card/vendor/base/view/categories/Categories";

import Delivery from "./delivery/Delivery";

import styles from "../styles/main.module.scss";

class View extends React.Component {
    constructor(props) {
        super(props);

        this.model = props.options.presenter.Model;
        this.company = props.options.initialData.company;
        this.banner = props.options.initialData.banner;
        this.trademarks = props.options.initialData.trademarks;
        this.promoTrademarks = props.options.initialData.promoTrademarks;
        this.categories = props.options.initialData.categories;
        this.rubrics = props.options.initialData.rubrics;

        this._addToBasket = this._addToBasket.bind(this);

        this.companyName = "johnson";
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
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section className="vendor-card vendor-card--johnson">
                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                <style jsx>
                    {styles}
                </style>

                <header className="vendor-card__header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <AboutCompany
                                    className="about-company--johnson"
                                    aboutCompany={this.company}
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="vendor-card__body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="vendor-card__section">
                                    <Trademarks trademarks={this.trademarks} />
                                </div>

                                <div className="vendor-card__section new-super-box-shadow">
                                    <Delivery trademarks={this.promoTrademarks} />
                                </div>

                                <div className="vendor-card__section">
                                    <Categories
                                        categories={this.categories}
                                    />
                                </div>

                                <div className="vendor-card__section">
                                    <ProductRubric
                                        items={this.rubrics}
                                        addToBasket={this._addToBasket}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="vendor-card__section">
                        <Company
                            className="company--johnson"
                            company={this.company}
                            banner={this.banner}
                            companyName={this.companyName}
                        />
                    </div>
                </div>
            </section>
        );
    }
}

View.propTypes = {
    options: PropTypes.instanceOf(Object).isRequired
};

export default View;
