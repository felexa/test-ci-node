import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import DeviceDesktop from "components/deviceDetector/desktop/Detector";
import DeviceMobile from "components/deviceDetector/mobile/Detector";
import Rubric from "components/rubric/product/Rubric";
import ReviewAboutProductRubric from "components/rubric/review/product/Rubric";
import MicroDataWebPage from "components/microData/WebPage";
import Consultation from "desktop/components/consultation/Consultation";

import Analytics from "desktop/modules/homePage/view/analytics/Analytics";
import AsideDesktopView from "./aside/DesktopView";
import AsideMobileView from "./aside/MobileView";
// import Banner from "./banner/Banner";
import TopCategory from "./topCategory/TopCategory";
import PopularCategory from "./popularCategory/PopularCategory";

import styles from "../styles/main.module.scss";

class Category extends React.Component {
    constructor(props) {
        super(props);
        /**
         * @property analytics
         * @type {Analytics}
         */
        this.analytics = new Analytics();

        this.state = {
            // banner: props.options.initialData.banner,
            topCategory: props.options.initialData.topCategory,
            popularCategory: props.options.initialData.popularCategory,
            allCategory: props.options.initialData.allCategory,
            rubrics: props.options.initialData.rubrics,
            lastReview: props.options.initialData.lastReview
        };

        this._addToBasket = this._addToBasket.bind(this);
        this._showMoreReviews = this._showMoreReviews.bind(this);
    }

    /**
     * @private
     * @method _getPresenter
     * @returns {Presenter}
     */
    _getPresenter() {
        return this.props.options.presenter;
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
        this._getPresenter().addToBasket(product, success, error);

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <section className="category">
                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                <style jsx>
                    {styles}
                </style>

                <div className="container-fluid">
                    <div className="row row--no-horizontal-sm-margins">
                        <div className="col">
                            <header className="category__header">
                                <h1 className="f-weight-5 color-black">Медикаменты</h1>
                            </header>
                        </div>
                    </div>
                    <div className="row row--no-horizontal-sm-margins">
                        <DeviceDesktop>
                            <aside className="col col-md-4 col-lg-3">
                                <div className="category__aside rounded-16 bg-white new-super-box-shadow p-24">
                                    <AsideDesktopView
                                        allCategory={this.state.allCategory}
                                    />
                                </div>
                            </aside>

                            <div className="col col-md-8 col-lg-9">
                                <div className="category__body rounded-16 bg-white new-super-box-shadow p-12 p-md-24">
                                    {/*<DeviceDesktop>
                                        <Banner banner={this.state.banner} />
                                    </DeviceDesktop>*/}

                                    <TopCategory topCategory={this.state.topCategory} />

                                    <div className="mb-32">
                                        <Consultation />
                                    </div>

                                    <PopularCategory popularCategory={this.state.popularCategory} />

                                    <DeviceMobile>
                                        <AsideMobileView allCategory={this.state.allCategory} />
                                    </DeviceMobile>

                                </div>

                                <div className="category__rubrics">
                                    <Rubric
                                        items={this.state.rubrics}
                                        addToBasket={this._addToBasket}
                                    />
                                </div>

                                <div className="category__comments">
                                    <ReviewAboutProductRubric
                                        items={this.state.lastReview}
                                        selectNextItem={this._showMoreReviews}
                                    />
                                </div>
                            </div>
                        </DeviceDesktop>

                        <DeviceMobile>
                            <div className="col">
                                <div className="category__body rounded-16 bg-white new-super-box-shadow p-12 p-md-24">
                                    {/*<DeviceDesktop>
                                        <Banner banner={this.state.banner} />
                                    </DeviceDesktop>*/}

                                    <TopCategory topCategory={this.state.topCategory} />

                                    <div className="mb-32">
                                        <Consultation />
                                    </div>

                                    <PopularCategory popularCategory={this.state.popularCategory} />

                                    <AsideMobileView allCategory={this.state.allCategory} />

                                </div>

                                <div className="category__rubrics">
                                    <Rubric
                                        items={this.state.rubrics}
                                        addToBasket={this._addToBasket}
                                    />
                                </div>

                                <div className="category__comments">
                                    <ReviewAboutProductRubric
                                        items={this.state.lastReview}
                                        selectNextItem={this._showMoreReviews}
                                    />
                                </div>
                            </div>
                        </DeviceMobile>
                    </div>
                </div>
            </section>
        );
    }
}

Category.propTypes = {
    options: PropTypes.instanceOf(Object).isRequired
};

export default Category;
