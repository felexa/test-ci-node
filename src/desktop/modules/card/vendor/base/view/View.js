import React from "react";
import PropTypes from "prop-types";

import PageTypesEnum from "app/core/utilites/enum/vendorCard/pages";
import MicroDataWebPage from "components/microData/WebPage";

import Advantage from "components/advantage/Advantage";

import Company from "desktop/modules/card/vendor/base/view/company/Company";
import Product from "desktop/modules/card/vendor/base/view/product/Product";
import AboutCompany from "desktop/modules/card/vendor/base/view/about/AboutCompany";

class View extends React.Component {
    constructor(props) {
        super(props);

        this.pageTypes = PageTypesEnum.getInstance();

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
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section className="vendor-card">
                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

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
                                        <h3>Преимущества препарата</h3>
                                    </header>

                                    <div className="advantages-product__body">
                                        <Advantage advantage={this.productAdvantages} />
                                    </div>
                                </section>

                                <AboutCompany className="vendor-card__section" aboutCompany={this.company} />
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
