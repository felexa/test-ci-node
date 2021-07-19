import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import Validator from "app/core/utilites/validator/Validator";
import Algorithms from "app/core/utilites/validator/Algorithms";
import ModalDialogService from "app/core/services/modalDialog";

import ModalSuccess from "components/modal/Success";
import ModalError from "components/modal/Error";
import MicroDataWebPage from "components/microData/WebPage";

import styles from "../styles/main.module.scss";

class Feedback extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        this.state = {
            review: {
                email: "",
                comment: ""
            }
        };

        this.Validator = Validator;
        this.Algorithms = Algorithms;

        this.modalDialogService = ModalDialogService.getInstance();

        this._setEmail = this._setEmail.bind(this);
        this._setComment = this._setComment.bind(this);

        this._createFeedback = this._createFeedback.bind(this);
    }

    /**
     * @private
     * @method _isValidFeedback
     * @returns {boolean}
     */
    _isValidFeedback() {
        let report = new this.Validator(this._buildFeedback(), this._getAlgorithms()).validate();

        this.Validator.toggleValidateErrors(report);

        return !report.hasError();
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
     * @method _getAlgorithms
     * @returns {Object}
     */
    _getAlgorithms() {
        return new this.Algorithms().getAlgorithms([
            {
                type: "email",
                name: "email",
                selector: ".error-email-field"
            },
            {
                type: "text",
                name: "comment",
                selector: ".error-comment-field"
            }
        ]);
    }

    /**
     * @private
     * @method _setDefaultState
     * @returns {Feedback}
     */
    _setDefaultState() {
        this.setState({
            review: {
                email: '',
                comment: ''
            }
        });

        return this;
    }

    /**
     * @private
     * @method _setEmail
     * @params Event {Object}
     * @returns {Feedback}
     */
    _setEmail(e) {
        e.persist();

        this.setState((state) => _.merge({}, state, {
            review: {
                email: e.target.value
            }
        }));

        return this;
    }

    /**
     * @private
     * @method _setComment
     * @params Event {Object}
     * @returns {Feedback}
     */
    _setComment(e) {
        e.persist();

        this.setState((state) => _.merge({}, state, {
            review: {
                comment: e.target.value
            }
        }));

        return this;
    }

    /**
     * @private
     * @method _buildFeedback
     * @returns {{comment: string, email: string}}
     */
    _buildFeedback() {
        return {
            email: this.state.review.email.trim(),
            comment: this.state.review.comment.trim()
        };
    }

    /**
     * @private
     * @method _showModalDialog
     * @param Component {React.element}
     * @param title {string}
     * @param description {string}
     * @returns {Feedback}
     */
    _showModalDialog(Component, title, description) {
        this.modalDialogService.open({
            body: <Component title={title} description={description} />,
            size: this.modalDialogService.getSizes().getSm()
        });

        return this;
    }

    /**
     * @private
     * @method _createFeedback
     * @returns {Feedback}
     */
    _createFeedback() {
        if (this._isValidFeedback()) {
            this._getPresenter().createFeedback(
                this._buildFeedback(),
                () => {
                    this._setDefaultState();
                    this._showModalDialog(
                        ModalSuccess,
                        this.HTMLResource.feedback.modal.success.title,
                        this.HTMLResource.feedback.modal.success.description
                    );
                },
                () => this._showModalDialog(
                    ModalError,
                    this.HTMLResource.feedback.modal.error.title,
                    this.HTMLResource.feedback.modal.error.description
                )
            );
        }

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section className="feedback rounded-16 mt-20">
                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                <style jsx>
                    {styles}
                </style>

                <header className="feedback__header">
                    <div className="container-fluid">
                        <div className="row row--no-horizontal-sm-margins">
                            <div className="col">
                                <h1>{this.HTMLResource.feedback.title}</h1>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="feedback__body">
                    <div className="container-fluid">
                        <div className="row row--no-horizontal-sm-margins">
                            <div className="col">
                                <div className="feedback__description rounded-16 p-16 p-lg-40">
                                    <p>{this.HTMLResource.feedback.ourTarget}</p>

                                    <p>{this.HTMLResource.feedback.takeAction}</p>

                                    <p>{this.HTMLResource.feedback.editorialTeamWork}</p>
                                </div>

                                <div className="feedback__review">
                                    <div className="outlined-text-form">
                                        <input
                                            onChange={this._setEmail}
                                            value={this.state.review.email}
                                            type="text"
                                            className="form-control"
                                            maxLength="100"
                                            required
                                        />

                                        <label>{this.stringsResource.yourEmail}</label>

                                        <div className="error-message error-email-field" />
                                    </div>

                                    <div className="outlined-text-form">
                                        <textarea
                                            onChange={this._setComment}
                                            value={this.state.review.comment}
                                            className="form-control"
                                            placeholder={this.stringsResource.yourMessage}
                                            maxLength="10000"
                                        />

                                        <div className="error-message error-comment-field" />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn-default btn-lg"
                                        onClick={this._createFeedback}
                                    >
                                        {this.stringsResource.send}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Feedback.propTypes = {
    options: PropTypes.instanceOf(Object).isRequired
};

export default Feedback;
