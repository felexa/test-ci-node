/* eslint-disable react/prop-types,react/no-danger */
import React from "react";
// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Box from "app/core/components/Box";
import Questions from "app/desktop/modules/faq/components/questions/Questions";

import Header from "./header/Header";

import styles from "../styles/main.module.scss";

class FAQ extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property presenter
         * @type {Presenter}
         */
        this.presenter = props.options.presenter;
    }

    /**
     * @private
     * @method _getQuestions
     * @returns {Array}
     */
    _getQuestions() {
        return this.props.options.initialData.questions;
    }

    /**
     * @private
     * @method _getTotalCount
     * @returns {number}
     */
    _getTotalCount() {
        return this.props.options.initialData.totalCount;
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
     * @public
     * @method render
     * @returns {React.Element}
     */
    render() {
        return (
            <section className="faq">
                <style jsx>
                    {styles}
                </style>

                <Header />

                <div className="faq__body">
                    <div className="container-fluid">
                        <div className="row row--no-horizontal-sm-margins">
                            <div className="col">
                                <Box
                                    component="div"
                                    rounded={16}
                                    className="bg-white new-super-box-shadow"
                                >
                                    <Questions
                                        className="faq__questions"
                                        items={this._getQuestions()}
                                        currentPage={this._getCurrentPage()}
                                        totalCount={this._getTotalCount()}
                                    />
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default FAQ;
