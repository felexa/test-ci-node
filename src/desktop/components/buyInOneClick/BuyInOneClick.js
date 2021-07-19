/* eslint-disable react/no-danger */

import React from "react";
import PropTypes from "prop-types";

import _ from "lodash";
import classNames from "classnames";
import InputMask from "react-input-mask";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Validator from "app/core/utilites/validator/Validator";
import Algorithms from "app/core/utilites/validator/Algorithms";

import ModalDialogService from "app/core/services/modalDialog";

import ModalSuccess from "desktop/components/modal/Success";
import ModalError from "desktop/components/modal/Error";

class BuyInOneClick extends React.Component {
    constructor(props) {
        super(props);

        this.rootElementRef = React.createRef();

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
            isLoading: false,
            order: {
                name: "",
                phone: "",
                email: ""
            }
        };

        this.Validator = Validator;
        this.Algorithms = Algorithms;

        this.ModalDialogService = ModalDialogService.getInstance();

        this.toggleLoader = this.toggleLoader.bind(this);
        this.setDefaultState = this.setDefaultState.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.createOrder = this.createOrder.bind(this);

        this._showModalDialog = this._showModalDialog.bind(this);
    }

    /**
     * @method isLoading
     * @returns {boolean}
     */
    isLoading() {
        return this.state.isLoading;
    }

    /**
     * @method isValidOrder
     * @returns {boolean}
     */
    isValidOrder() {
        let report = new this.Validator(this.state.order, this.getAlgorithms()).validate();

        this.Validator.toggleValidateErrors(report, this._getRootElement());

        return !report.hasError();
    }

    /**
     * @private
     * @method _getRootElement
     * @returns {Object}
     */
    _getRootElement() {
        return this.rootElementRef && this.rootElementRef.current;
    }

    /**
     * @method getAlgorithms
     * @returns {Object}
     */
    getAlgorithms() {
        return new this.Algorithms().getAlgorithms([
            {
                type: "text",
                name: "name",
                selector: ".error-name-field"
            },
            {
                type: "phone",
                name: "phone",
                selector: ".error-phone-field"
            },
            {
                type: "email",
                name: "email",
                selector: ".error-email-field"
            }
        ]);
    }

    /**
     * @method setDefaultState
     * @returns {BuyInOneClick}
     */
    setDefaultState() {
        this.setState({
            isLoading: false,
            order: {
                name: "",
                phone: "",
                email: ""
            }
        });

        return this;
    }

    /**
     * @method toggleLoader
     * @param state {boolean}
     * @returns {BuyInOneClick}
     */
    toggleLoader(state) {
        this.setState({isLoading: Boolean(state)});

        return this;
    }

    /**
     * @method changeName
     * @param e {Object}
     * @returns {BuyInOneClick}
     */
    changeName(e) {
        e.persist();

        this.setState((state) => _.merge({}, state, {order: {name: e.target.value}}));

        return this;
    }

    /**
     * @method changeEmail
     * @param e {Object}
     * @returns {BuyInOneClick}
     */
    changeEmail(e) {
        e.persist();

        this.setState((state) => _.merge({}, state, {order: {email: e.target.value}}));

        return this;
    }

    /**
     * @method changePhone
     * @param e {Object}
     * @returns {BuyInOneClick}
     */
    changePhone(e) {
        e.persist();

        this.setState((state) => _.merge({}, state, {order: {phone: e.target.value.replace(/^\d/, "")}}));

        return this;
    }

    /**
     * @method createOrder
     * @returns {BuyInOneClick}
     */
    createOrder() {
        if (this.isValidOrder()) {
            this.toggleLoader(true);

            this.props.create(
                this.state.order,
                () => this._showModalDialog(
                    ModalSuccess,
                    this.stringsResource.thankYouForTheOrder,
                    `${this.stringsResource.callYouToClarifyOrderDetails} :)`,
                ),
                () => this._showModalDialog(
                    ModalError,
                    this.stringsResource.errors.server.default.title,
                    this.stringsResource.errors.server.default.description
                )
            );
        }

        return this;
    }

    /**
     * @private
     * @method _showModalDialog
     * @param Component {React.element}
     * @param title {string}
     * @param description {string}
     * @returns {BuyInOneClick}
     */
    _showModalDialog(Component, title, description) {
        this.setDefaultState();

        this.ModalDialogService.open({
            body: <Component
                title={title}
                description={description}
            />,
            size: this.ModalDialogService.getSizes().getSm()
        });

        return this;
    }

    render() {
        return (
            <section
                ref={this.rootElementRef}
                className={classNames("buy-in-one-click", {
                    loading: this.isLoading()
                })}
            >
                <header>
                    <p className="text-gray mt-0 mb-24">
                        {this.HTMLResource.buyInOneClick.instruction}
                    </p>
                </header>

                <div className="buy-in-one-click__body">
                    <div className="buy-in-one-click__field mb-24 mt-16">
                        <div className="outlined-text-form">
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={this.state.order.name}
                                onChange={this.changeName}
                            />

                            <label>
                                {this.stringsResource.yourName}
                            </label>
                        </div>

                        <div className="error-message error-name-field" />
                    </div>

                    <div className="buy-in-one-click__field mb-24">
                        <div className="outlined-text-form">
                            <InputMask
                                mask="+38 (999) 999-99-99"
                                maskChar={null}
                                type="text"
                                className="form-control"
                                required
                                value={this.state.order.phone}
                                onChange={this.changePhone}
                            />

                            <label>
                                {this.stringsResource.yourPhone}
                            </label>
                        </div>

                        <div className="error-message error-phone-field" />
                    </div>

                    <div className="buy-in-one-click__field mb-24">
                        <div className="outlined-text-form">
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={this.state.order.email}
                                onChange={this.changeEmail}
                            />

                            <label>
                                {this.stringsResource.yourEmail}
                            </label>
                        </div>

                        <div className="error-message error-email-field" />
                    </div>
                </div>

                <footer className="w-100">
                    <button
                        type="button"
                        className="btn-default btn-md text-uppercase w-100"
                        onClick={this.createOrder}
                    >
                        {this.stringsResource.sendOrder}
                    </button>
                </footer>
            </section>
        );
    }
}

BuyInOneClick.propTypes = {
    create: PropTypes.func.isRequired
};

export default BuyInOneClick;
