/* eslint-disable max-len */
import React from "react";
// import classNames from "classnames";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import Dom from "app/core/utilites/dom";

import Header from "./header/Header";
import Discount from "./discount/Discount";
import HowWorks from "./howWorks/HowWorks";
import Advantages from "./advantages/Advantages";
import Tasks from "./tasks/Tasks";
import Partners from "./partners/Partners";
import Statistics from "./statistics/Statistics";

import styles from "../styles/main.module.scss";

class EmployeeDiscount extends React.Component {
    constructor(props) {
        super(props);

        this.selectors = {
            form: ".section.discount .employee-discount__invite"
        };

        /**
         * @property dom
         * @type {Dom}
         */
        this.dom = Dom.getInstance();

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this._confirmInvite = this._confirmInvite.bind(this);
        this._scrollToInvite = this._scrollToInvite.bind(this);
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
     * @method _getPresenter
     * @returns {Presenter}
     */
    _getPresenter() {
        // eslint-disable-next-line react/prop-types
        return this.props.options.presenter;
    }

    /**
     * @method _getInviter
     * @returns {Employee}
     * @private
     */
    _getInviter() {
        // eslint-disable-next-line react/prop-types
        return this.props.options.initialData.inviter;
    }

    /**
     * @private
     * @method _getExpireDate
     * @returns {string}
     */
    _getExpireDate() {
        // eslint-disable-next-line react/prop-types
        return this.props.options.initialData.expireDate;
    }

    /**
     * @private
     * @method _getRegistrationStatistics
     * @returns {string}
     */
    _getRegistrationStatistics() {
        // eslint-disable-next-line react/prop-types
        return this.props.options.initialData.registrationStatistics;
    }

    /**
     * @method _confirmInvite
     * @param profile {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {EmployeeDiscount}
     * @private
     */
    _confirmInvite(profile, success, error) {
        this._getPresenter().confirmInvite(profile, success, error);

        return this;
    }

    /**
     * @method _scrollToInvite
     * @returns {EmployeeDiscount}
     * @private
     */
    _scrollToInvite() {
        this.dom.scrollToElementWithOffset(this.selectors.form, 40, 190);

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section className="employee-discount">
                <style jsx>
                    {styles}
                </style>

                <Header expireDate={this._getExpireDate()} />

                <div className="employee-discount__body">
                    <Discount inviter={this._getInviter()} confirm={this._confirmInvite} />
                    <HowWorks />
                    <Advantages />
                    <Tasks />
                    <Partners />
                    <Statistics statistics={this._getRegistrationStatistics()} />
                </div>

                <div className="employee-discount__footer">
                    <div className="d-flex justify-content-center align-items-center">
                        <button
                            type="button"
                            className="employee-discount__to-invite btn-default btn-md"
                            onClick={this._scrollToInvite}
                        >
                            {this.stringsResource.sendRequest}
                        </button>
                    </div>
                </div>
            </section>
        );
    }
}

export default EmployeeDiscount;
