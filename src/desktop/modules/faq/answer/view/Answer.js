/* eslint-disable react/prop-types,react/no-danger */
import React from "react";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Box from "app/core/components/Box";
import Questions from "app/desktop/modules/faq/components/questions/Questions";

import Header from "./header/Header";
import MicroData from "./microData/MicroData";

import styles from "../styles/main.module.scss";

class Answer extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property presenter
         * @type {Presenter}
         */
        this.presenter = props.options.presenter;
    }

    /**
     * @private
     * @method _hasSourceLinks
     * @returns {boolean}
     */
    _hasSourceLinks() {
        return Boolean(this._getSourceLinks() && this._getSourceLinks().length);
    }

    /**
     * @private
     * @method _hasRelatedQuestions
     * @returns {boolean}
     */
    _hasRelatedQuestions() {
        return Boolean(this._getRelatedQuestions() && this._getRelatedQuestions().length);
    }

    /**
     * @private
     * @method _getAnswer
     * @returns {FAQ}
     */
    _getAnswer() {
        return this.props.options.initialData.answer;
    }

    /**
     * @private
     * @method _getRelatedQuestions
     * @returns {Array}
     */
    _getRelatedQuestions() {
        return this._getAnswer().getRelatedQuestions();
    }

    /**
     * @private
     * @method _getTitle
     * @returns {String}
     */
    _getTitle() {
        return this._getAnswer().getQuestion();
    }

    /**
     * @private
     * @method _getAnswerText
     * @returns {String}
     */
    _getAnswerText() {
        return this._getAnswer().getAnswer();
    }

    /**
     * @private
     * @method _getSourceLinks
     * @returns {Array}
     */
    _getSourceLinks() {
        return this._getAnswer().getSourceLinks();
    }

    /**
     * @private
     * @method _getAuthor
     * @returns {Profile}
     */
    _getAuthor() {
        return this._getAnswer().getRedactor();
    }

    /**
     * @private
     * @method _getCensor
     * @returns {Profile}
     */
    _getCensor() {
        return this._getAnswer().getCensor();
    }

    /**
     * @private
     * @method _getLastUpdateDateAsMilliseconds
     * @returns {number}
     */
    _getLastUpdateDateAsMilliseconds() {
        return new Date(this._getAnswer().getUpdatedAt()).getTime();
    }

    /**
     * @private
     * @method _renderSourceLinks
     * @returns {Array}
     */
    _renderSourceLinks() {
        return this._getSourceLinks().map((item) => (
            <li
                className="source-links__item"
                key={item.getTitle()}
            >
                <a
                    className="f-weight-4"
                    href={item.getUrl()}
                    target="_blank"
                >
                    { item.getTitle() }
                </a>
            </li>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section className="faq-answer">
                <MicroData
                    author={this._getAuthor()}
                    censor={this._getCensor()}
                    updatedAt={this._getLastUpdateDateAsMilliseconds()}
                    text={this._getAnswerText()}
                    title={this._getTitle()}
                />

                <style jsx>
                    {styles}
                </style>

                <Header
                    title={this._getTitle()}
                    author={this._getAuthor()}
                    reviewer={this._getCensor()}
                    lastUpdateDateAsMilliseconds={this._getLastUpdateDateAsMilliseconds()}
                />

                <div className="faq-answer__body">
                    <div className="container-fluid">
                        <div className="row row--no-horizontal-sm-margins">
                            <div className="col">
                                <Box
                                    component="div"
                                    rounded={16}
                                    className="bg-white new-super-box-shadow"
                                >
                                    <div className="faq-answer__answer answer">
                                        <div className="answer__author">
                                            <div className="d-flex align-items-center">
                                                <div className="author__avatar rounded-100 d-flex justify-content-center align-items-center">
                                                    <img
                                                        src={this.Resource.links.avatarLogo}
                                                        alt="apteka24"
                                                    />
                                                </div>

                                                <div className="author__name">
                                                    <p className="f-weight-5">
                                                        {this.stringsResource.officialAnswer}
                                                    </p>

                                                    <p>
                                                        {this.stringsResource.from.toLowerCase()} <span className="f-weight-5">apteka24.ua</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className="answer__text"
                                            dangerouslySetInnerHTML={{__html: this._getAnswerText()}}
                                        />

                                        {this._hasSourceLinks() && (
                                            <div className="answer__source-links">
                                                <p className="source-links__title f-weight-5">
                                                    {this.stringsResource.sources}
                                                </p>

                                                <ul className="source-links__items">
                                                    { this._renderSourceLinks() }
                                                </ul>
                                            </div>
                                        )}

                                        {this._hasRelatedQuestions() && (
                                            <div className="answer__related-questions">
                                                <p className="related-questions__title f-weight-5">
                                                    {this.stringsResource.similarQuestions}
                                                </p>

                                                <Questions
                                                    className="questions--related"
                                                    items={this._getRelatedQuestions()}
                                                    currentPage={1}
                                                    totalCount={4}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Answer;
