/* eslint-disable react/prop-types */
import React from "react";
// import PropTypes from "prop-types";
import Head from 'next/head';
// import classNames from "classnames";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import {withTranslation} from "config/i18n";

import MicroDataWebSite from "components/microData/WebSite";
import MicroDataWebPage from "components/microData/WebPage";
import MicroDataOrganization from "components/microData/Organization";

import DeviceMobile from "components/deviceDetector/mobile/Detector";
import DeviceDesktop from "components/deviceDetector/desktop/Detector";
import Menu from "components/menu/desktop-cascade/Menu";
import MenuService from "app/core/services/menu";
import ProductRubric from "components/rubric/product/Rubric";
import ReviewAboutProductRubric from "components/rubric/review/product/Rubric";
import ReviewAboutProjectRubric from "components/rubric/review/project/Rubric";
import BasketSummary from "components/basket/type/summary/BasketSummary";
import Brand from "components/brand/Brand";
import Blog from "components/rubric/blog/Blog";
import MediaArticles from "components/mediaArticles/MediaArticles";
import Consultation from "desktop/components/consultation/Consultation";
// import Share from "components/rubric/share/Share";
// import Story from "components/story/Story";
// import Link from "desktop/components/link/Link";
import HotNav from "./hotNav/HotNav";
import Awards from "./awards/Awards";
import Banner from "./banner/Banner";
import About from "./about/About";
// import LoyaltyPromo from "./loyaltyPromo/LoyaltyPromo";

import Analytics from "./analytics/Analytics";

import styles from "../styles/main.module.scss";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.model = props.options.model;

        this.timeBeforeRubricsInitAsMilliseconds = 250;

        this.state = {
            menu: props.options.initialData.menu,
            shareProductsAsRubric: [],
            popularProductsAsRubric: [],
            viewedProductsAsRubric: [],
            lastArticlesAsRubric: props.options.initialData.blog
        };

        /**
         * @property analytics
         * @type {Analytics}
         */
        this.analytics = new Analytics();

        this.menuService = MenuService.getInstance();

        this._getMenu = this._getMenu.bind(this);
        this._toggleMenu = this._toggleMenu.bind(this);

        this._redirectFromPromoBanner = this._redirectFromPromoBanner.bind(this);
        this._changePromoBanner = this._changePromoBanner.bind(this);
        this._showMorePopularProducts = this._showMorePopularProducts.bind(this);
        this._showMoreReviews = this._showMoreReviews.bind(this);
        this._selectPopularProduct = this._selectPopularProduct.bind(this);
        this._selectBrand = this._selectBrand.bind(this);
        this._addToBasket = this._addToBasket.bind(this);
    }

    componentDidMount() {
        this._getMenu();
        this.analytics.pageEntry();

        this._initRubrics();
        this._getLastArticlesAsRubric();
    }

    /**
     * @private
     * @method _initRubrics
     * @returns {Home}
     */
    _initRubrics() {
        setTimeout(() => {
            this._getViewedProductsAsRubric();
            this._getShareProductsAsRubric();
            this._getPopularProductsAsRubric();
        }, this.timeBeforeRubricsInitAsMilliseconds);

        return this;
    }

    /**
     * @private
     * @method _hasMenu
     * @returns {boolean}
     */
    _hasMenu() {
        return Boolean(this.state.menu.length);
    }

    /**
     * @private
     * @method _hasRubrics
     * @returns {boolean}
     */
    _hasRubrics() {
        return Boolean(this._getRubrics().length);
    }

    /**
     * @private
     * @method _hasBrands
     * @returns {boolean}
     */
    _hasBrands() {
        return Boolean(this.props.options.initialData.brands.getItems().length);
    }

    /**
     * @private
     * @method _hasBlogArticles
     * @returns {boolean}
     */
    _hasBlogArticles() {
        return Boolean(this._getBlog().getItems().length);
    }

    /**
     * @private
     * @method _hasAwards
     * @returns {boolean}
     */
    _hasAwards() {
        return Boolean(this._getAwards().length);
    }

    /**
     * @private
     * @method _hasComments
     * @returns {boolean}
     */
    _hasComments() {
        return Boolean(this._getLastReview().every((item) => item.getItems().length));
    }

    /**
     * @private
     * @method _hasViewedProductsAsRubric
     * @returns {boolean}
     */
    _hasViewedProductsAsRubric() {
        return Boolean(this.state.viewedProductsAsRubric.length);
    }

    /**
     * @private
     * @method _hasShareProductsAsRubric
     * @returns {boolean}
     */
    _hasShareProductsAsRubric() {
        return Boolean(this.state.shareProductsAsRubric.length);
    }

    /**
     * @private
     * @method _hasPopularProductsAsRubric
     * @returns {boolean}
     */
    _hasPopularProductsAsRubric() {
        return Boolean(this.state.popularProductsAsRubric.length);
    }

    /**
     * @private
     * @method _toggleMenu
     * @param state {boolean}
     * @returns {Home}
     */
    _toggleMenu(state) {
        this.menuService.toggle(state, "hover");

        this.analytics.openCatalogMenu();

        return this;
    }

    /**
     * @private
     * @method _getPageInfo
     * @returns {Object}
     */
    _getPageInfo() {
        return this.props.options.initialData.pageInfo;
    }

    /**
     * @private
     * @method _getMenu
     * @returns {Home}
     */
    _getMenu() {
        this.menuService.getCatalog(
            (menu) => {
                this.setState({menu});
            },
            () => {}
        );

        return this;
    }

    /**
     * @private
     * @method _getRubrics
     * @returns {ProductRubric[]}
     */
    _getRubrics() {
        return this.props.options.initialData.rubrics;
    }

    /**
     * @method
     * @return {CommentRubric[]}
     * @private
     */
    _getLastReview() {
        return this.props.options.initialData.lastReview;
    }

    /**
     * @private
     * @method _getViewedProductsAsRubric
     */
    _getViewedProductsAsRubric() {
        this.model.getViewedProductsAsRubric((rubric) => {
            this.setState({ viewedProductsAsRubric: [rubric] });
        }, () => {});
    }

    /**
     * @private
     * @method _getPopularProductsAsRubric
     */
    _getPopularProductsAsRubric() {
        this.model.getPopularProducts((rubric) => {
            this.setState({ popularProductsAsRubric: [rubric] });
        }, () => {});
    }

    /**
     * @private
     * @method _getShareProductsAsRubric
     */
    _getShareProductsAsRubric() {
        this.model.getShareProducts((rubric) => {
            this.setState({ shareProductsAsRubric: [rubric] });
        }, () => {});
    }

    /**
     * @private
     * @method _getLastArticlesAsRubric
     */
    _getLastArticlesAsRubric() {
        this.model.getLastArticles((rubric) => {
            this.setState({ lastArticlesAsRubric: rubric });
        }, () => {});
    }

    /**
     * @private
     * @method _getBanners
     * @returns {Banner[]}
     */
    _getBanners() {
        return this.props.options.initialData.banners;
    }

    /**
     * @private
     * @method _getFirstBanner
     * @returns {Banner}
     */
    _getFirstBanner() {
        return this._getBanners()[0];
    }

    /**
     * @private
     * @method _getShares
     * @returns {Share[]}
     */
    _getShares() {
        return this.props.options.initialData.share;
    }

    /**
     * @private
     * @method _getAboutContent
     * @returns {string}
     */
    _getAboutContent() {
        return this.props.options.initialData.about;
    }

    /**
     * @private
     * @method _getAwards
     * @returns {Article[]}
     */
    _getAwards() {
        return this.props.options.initialData.awards;
    }

    /**
     * @private
     * @method _getBlog
     * @returns {BlogRubric}
     */
    _getBlog() {
        return this.state.lastArticlesAsRubric;
    }

    /**
     * @private
     * @method _redirectFromPromoBanner
     * @param event {Object}
     * @returns {Home}
     */
    _redirectFromPromoBanner(event) {
        event.preventDefault();

        this.analytics.redirectFromPromoBanner();

        window.location.href = event.currentTarget.href;

        return this;
    }

    /**
     * @private
     * @method _changePromoBanner
     * @returns {Home}
     */
    _changePromoBanner() {
        this.analytics.changePromoBanner();

        return this;
    }

    /**
     * @private
     * @method _selectPopularProduct
     * @returns {Home}
     */
    _selectPopularProduct() {
        this.analytics.selectPopularProduct();

        return this;
    }

    /**
     * @private
     * @method _showMorePopularProducts
     * @returns {Home}
     */
    _showMorePopularProducts() {
        this.analytics.showMorePopularProducts();

        return this;
    }

    /**
     * @private
     * @method _selectBrand
     * @param event {Object}
     * @returns {Home}
     */
    _selectBrand(event) {
        event.preventDefault();

        this.analytics.selectBrand();

        window.location.href = event.currentTarget.href;

        return this;
    }

    /**
     * @private
     * @method _showMoreReviews
     * @returns {Home}
     */
    _showMoreReviews() {
        this.analytics.showMoreReviews();

        return this;
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
     * @private
     * @method _renderHead
     * @returns {React.ReactElement}
     */
    _renderHead() {
        return (
            <>
                <Head>
                    <DeviceMobile>
                        <link
                            rel="preload"
                            href={this._getFirstBanner().getMobileImage().getPrimitive()}
                            as="image"
                        />
                    </DeviceMobile>
                </Head>

                <Head>
                    <DeviceDesktop>
                        <link
                            rel="preload"
                            href={this._getFirstBanner().getDesktopImage().getPrimitive()}
                            as="image"
                        />
                    </DeviceDesktop>
                </Head>
            </>
        );
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <>
                <MicroDataWebSite />

                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                <MicroDataOrganization />

                <style jsx>
                    {styles}
                </style>

                { this._renderHead() }

                <section className="home-page">
                    <header className="home-page__header">
                        <div className="container-fluid">
                            <div className="row row--no-horizontal-margins-before-lg">
                                {this._hasMenu() && (
                                    <div className="col menu-wrapper flex-grow-0 d-none d-xl-flex align-items-start">
                                        {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
                                        <Menu menu={this.state.menu} onMouseOver={this._toggleMenu} />
                                    </div>
                                )}

                                <div className="col">
                                    <BasketSummary className="mr-lg-0 ml-lg-0 mb-16 mr-12 ml-12" />

                                    <Banner
                                        className="home-page__banner"
                                        items={this._getBanners()}
                                        click={this._redirectFromPromoBanner}
                                        selectItem={this._changePromoBanner}
                                    />
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="home-page__body">
                        {/*<div className="home-page-section d-md-none">*/}
                        {/*    <div className="container-fluid">*/}
                        {/*        <div className="row">*/}
                        {/*            <div className="col">*/}
                        {/*                <LoyaltyPromo />*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <div className="home-page-section">
                            <HotNav menu={this.state.menu} />
                        </div>

                        <div className="home-page-section">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <Consultation />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {this._hasBrands() && (
                            <div className="home-page-section">
                                <Brand rubric={this.props.options.initialData.brands} select={this._selectBrand} />
                            </div>
                        )}

                        {this._hasComments() && (
                            <div className="home-page-section">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col">
                                            <ReviewAboutProductRubric
                                                items={this._getLastReview()}
                                                selectNextItem={this._showMoreReviews}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {
                            this._hasViewedProductsAsRubric() && (
                                <div className="home-page-section">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col">
                                                <ProductRubric
                                                    items={this.state.viewedProductsAsRubric}
                                                    selectItem={this._selectPopularProduct}
                                                    open={this._showMorePopularProducts}
                                                    addToBasket={this._addToBasket}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {this._hasShareProductsAsRubric() && (
                            <div className="home-page-section">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col">
                                            <ProductRubric
                                                items={this.state.shareProductsAsRubric}
                                                selectItem={this._selectPopularProduct}
                                                open={this._showMorePopularProducts}
                                                addToBasket={this._addToBasket}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {this._hasPopularProductsAsRubric() && (
                            <div className="home-page-section">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col">
                                            <ProductRubric
                                                items={this.state.popularProductsAsRubric}
                                                selectItem={this._selectPopularProduct}
                                                open={this._showMorePopularProducts}
                                                addToBasket={this._addToBasket}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {this._hasBlogArticles() && (
                            <div className="home-page-section">
                                <Blog rubric={this._getBlog()} />
                            </div>
                        )}

                        <div className="home-page-section">
                            <MediaArticles rubric={this.props.options.initialData.massMedia} />
                        </div>

                        <div className="home-page-section">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <ReviewAboutProjectRubric
                                            items={this.props.options.initialData.reviewFromDoctors}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="home-page-section">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col">
                                        <About content={this._getAboutContent()} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            this._hasAwards() && (
                                <div className="home-page-section">
                                    <div className="container-fluid">
                                        <div className="row row--no-horizontal-margins-before-lg">
                                            <div className="col">
                                                <Awards items={this._getAwards()} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </section>
            </>
        );
    }
}

// Home.propTypes = {
//     i18n: PropTypes.instanceOf(Object).isRequired
// };

export default withTranslation()(Home);
