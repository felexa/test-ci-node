import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import FAQ from "components/faq/FAQ";
import MicroDataFaq from "components/faq/microData/MicroData";
import MicroDataWebPage from "components/microData/WebPage";

import Banner from "./banner/Banner";
import Features from "./features/Features";
import FindDrugs from "./findDrugs/FindDrugs";
import Review from "./review/Review";
import HowWorks from "./howWorks/HowWorks";
import Delivery from "./delivery/Delivery";

import styles from "../styles/main.module.scss";

class HowWeWork extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.reviewFromDoctors = props.options.initialData.reviewFromDoctors;
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
     * @returns {React.element}
     */
    render() {
        return (
            <section className="how-it-works">
                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                <MicroDataFaq
                    faq={this.faq}
                />

                <style jsx>
                    {styles}
                </style>

                <div className="how-it-works__header">
                    <Banner />
                </div>

                <div className="how-it-works__body">
                    <Features />
                    <HowWorks />
                    <Delivery />
                    <FindDrugs />
                    <Review review={this.reviewFromDoctors} />

                    <div className="how-it-works__bottom-group">
                        <FAQ
                            items={this.faq}
                            title={this.stringsResource.frequentlyAskedQuestions}
                        />
                    </div>
                </div>
            </section>
        );
    }
}

HowWeWork.propTypes = {
    options: PropTypes.instanceOf(Object).isRequired
};

export default HowWeWork;
