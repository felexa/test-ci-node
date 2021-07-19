/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Strings from "app/core/utilites/strings";

// import Link from "desktop/components/link/Link";
import Title from "components/title/Title";
import Pagination from "components/pagination/Pagination";
import ProductGroup from "components/productGroup/ProductGroup";
import ProductRubric from "components/rubric/product/Rubric";
import MicroDataWebPage from "components/microData/WebPage";

import Description from "./description/Description";

import styles from "../styles/main.module.scss";

class Classifier extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property _getModel
         * @type {Classifier}
         */
        this.model = this.props.options.model;

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {
            viewedProductsAsRubric: []
        };

        this.strings = Strings.getInstance();

        this._toNextPage = this._toNextPage.bind(this);
        this._buildUrlForNextPage = this._buildUrlForNextPage.bind(this);
        this._renderClassifier = this._renderClassifier.bind(this);
        this._addToBasket = this._addToBasket.bind(this);
    }

    componentDidMount() {
        this._getViewedProductsAsRubric();
    }

    /**
     * @private
     * @method _isMainPage
     * @returns {boolean}
     */
    _isMainPage() {
        let currentRoute = this.model.getCurrentRoute();

        return !currentRoute.query.query;
    }

    /**
     * @private
     * @method _hasClassifier
     * @returns {boolean}
     */
    _hasClassifier() {
        return Boolean(this._getClassifier().getDirectory().length);
    }

    /**
     * @private
     * @method _hasViewedProductsAsRubric
     * @return {boolean}
     */
    _hasViewedProductsAsRubric() {
        return Boolean(this.state.viewedProductsAsRubric.length);
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
     * @method _getClassifier
     * @returns {Classifier}
     */
    _getClassifier() {
        return this.props.options.initialData.classifier;
    }

    /**
     * @method _getTitle
     * @returns {string}
     * @private
     */
    _getTitle() {
        return this._getClassifier().getTitle() || this._getClassifier().getName();
    }

    /**
     * @private
     * @method _getTitleConfig
     * @returns {Object}
     */
    _getTitleConfig() {
        return {
            title: `${this._getTitle()} ${this.strings.writeLine(this.stringsResource.amountInTheCatalog, this._getClassifier().getItemsCount())}`
        };
    }

    /**
     * @private
     * @method _getCurrentPage
     * @returns {number}
     */
    _getCurrentPage() {
        return this.props.options.initialData.currentPage;
    }

    /**
     * @private
     * @method _getViewedProductsAsRubric
     */
    _getViewedProductsAsRubric() {
        this.model.getViewedProductsAsRubric((res) => {
            this.setState({ viewedProductsAsRubric: [res] });
        }, () => {});
    }

    /**
     * @private
     * @method _addToBasket
     * @param product {Product}
     * @param success {Function}
     * @param error {Function}
     * @returns {Classifier}
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
     * @private
     * @method _buildUrlForNextPage
     * @param page {number}
     * @returns {string}
     */
    _buildUrlForNextPage(page) {
        return this.model.buildUrlWithQueryString({page});
    }

    /**
     * @private
     * @method _toNextPage
     * @param currentPage {number}
     * @returns {Classifier}
     */
    _toNextPage(currentPage) {
        this.model.toPage(currentPage);

        return this;
    }

    /**
     * @private
     * @method _renderClassifier
     * @returns {Array}
     */
    _renderClassifier() {
        return this._getClassifier().getDirectory().map((item) => (
            <li className="catalog__item" key={item.getAlias()}>
                {/*<Link route={item.getUrl()}>*/}
                {/*    <a>{item.getTitle()}</a>*/}
                {/*</Link>*/}

                <a href={item.getUrl()}>{item.getTitle()}</a>
            </li>
        ));
    }

    /**
     * @private
     * @method _renderProductGroupItems
     * @returns {Array}
     */
    _renderProductGroupItems() {
        return this._getClassifier().getItems().map((item) => (
            <ProductGroup item={item} key={item.getId()} classNames="new-super-box-shadow" />
        ));
    }

    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <section className="catalog catalog--classifier">
                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                <style jsx>
                    {styles}
                </style>

                <header className="catalog__header">
                    <Title config={this._getTitleConfig()} tag="h1" />
                </header>

                <div className="catalog__body">
                    {this._hasClassifier() && (
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <ul className="catalog__classifier-items">
                                        {this._renderClassifier()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="page-section">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <div className="catalog__product-group-items d-flex flex-wrap">
                                        {this._renderProductGroupItems()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="page-section">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                    <Pagination
                                        activePage={this._getCurrentPage()}
                                        totalCount={this._getClassifier().getItemsCount()}
                                        change={this._toNextPage}
                                        buildUrl={this._buildUrlForNextPage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {this._isMainPage() && (
                        <div className="page-section">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <Description className="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {this._hasViewedProductsAsRubric() && (
                        <div className="page-section mt-0">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <ProductRubric
                                            items={this.state.viewedProductsAsRubric}
                                            addToBasket={this._addToBasket}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        );
    }
}

Classifier.propTypes = {
    options: PropTypes.instanceOf(Object).isRequired
};

export default Classifier;
