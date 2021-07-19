import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import MicroDataWebPage from "components/microData/WebPage";

import Advantage from "desktop/components/advantage/Advantage";
import Company from "desktop/modules/card/vendor/base/view/company/Company";
import AboutCompany from "desktop/modules/card/vendor/base/view/about/AboutCompany";
import Product from "./product/Product";

import styles from "../styles/main.module.scss";

class View extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.company = props.options.initialData.company;
        this.banner = props.options.initialData.banner;
        this.vendorAdvantages = props.options.initialData.vendorAdvantages;
        this.productAdvantages = props.options.initialData.productAdvantages;
        this.mainProduct = props.options.initialData.mainProduct;

        this.companyName = "farkos";
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
     * @returns {React.element}
     */
    render() {
        return (
            <section className="vendor-card vendor-card--farkos">
                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                <style jsx>
                    {styles}
                </style>

                <header className="vendor-card__header">
                    <Company
                        company={this.company}
                        banner={this.banner}
                        companyName={this.companyName}
                    />
                </header>

                <div className="vendor-card__body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <Advantage className="vendor-card__section" advantage={this.vendorAdvantages} />

                                <Product mainProduct={this.mainProduct} />

                                <section className="vendor-card__section advantages-product">
                                    <header>
                                        <h3 className="advantages-product__title f-weight-5">
                                            {this.stringsResource.drugBenefits}
                                        </h3>
                                    </header>

                                    <div className="advantages-product__body">
                                        <Advantage advantage={this.productAdvantages} />
                                    </div>
                                </section>

                                <AboutCompany
                                    className="vendor-card__section"
                                    aboutCompany={this.company}
                                />
                            </div>
                        </div>
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
