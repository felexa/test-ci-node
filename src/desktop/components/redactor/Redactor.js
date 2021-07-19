/* eslint-disable react/prop-types, react/jsx-no-target-blank, max-len */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import Numbers from "app/core/utilites/numbers";

class Redactor extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

        /**
         * @property numbers
         * @type {Numbers}
         */
        this.numbers = Numbers.getInstance();
    }

    /**
     * @method _isVerified
     * @returns {Boolean}
     * @private
     */
    _isVerified() {
        return Boolean(this._getReviewer().getName());
    }

    /**
     * @method _isShortName
     * @returns {Boolean}
     * @private
     */
    _isShortName() {
        return Boolean(this.props.shortName);
    }

    /**
     * @private
     * @method _hasPublishDate
     * @returns {boolean}
     */
    _hasPublishDate() {
        return Boolean(this.props.publishDate);
    }

    /**
     * @private
     * @method _hasRedactor
     * @returns {boolean}
     */
    _hasRedactor() {
        return Boolean(this._getProfile().getId());
    }

    /**
     * @private
     * @method _getProfile
     * @returns {Profile}
     */
    _getProfile() {
        return this.props.profile;
    }

    /**
     * @private
     * @method _getReviewer
     * @returns {Profile}
     */
    _getReviewer() {
        return this.props.reviewer;
    }

    /**
     * @private
     * @method _getPublishDate
     * @returns {string}
     */
    _getPublishDate() {
        let date = this.props.publishDate;

        return [
            this.numbers.addLeadingZero(date.getDate()),
            this.numbers.addLeadingZero(date.getMonth() + 1),
            date.getFullYear()
        ].join(".");
    }

    /**
     * @private
     * @method _getLastUpdateDate
     * @returns {string}
     */
    _getLastUpdateDate() {
        let date = this.props.lastUpdateDate;

        return [
            this.numbers.addLeadingZero(date.getDate()),
            this.numbers.addLeadingZero(date.getMonth() + 1),
            date.getFullYear()
        ].join(".");
    }

    /**
     * @private
     * @method _getRedactorName
     * @returns {string}
     */
    _getRedactorName() {
        return this._isShortName() ? this._getProfile().getShortName() : this._getProfile().getFullName();
    }

    /**
     * @private
     * @method _getReviewerName
     * @returns {string}
     */
    _getReviewerName() {
        return this._isShortName() ? this._getReviewer().getShortName() : this._getReviewer().getFullName();
    }

    /**
     * @private
     * @method _getPublishDateAsISO
     * @returns {string}
     */
    _getPublishDateAsISO() {
        return this.props.publishDate.toISOString();
    }

    /**
     * @private
     * @method _getLastUpdateDateAsISO
     * @returns {string}
     */
    _getLastUpdateDateAsISO() {
        return this.props.lastUpdateDate.toISOString();
    }

    render() {
        return (
            <div className={classNames("redactor", this.props.className)}>
                <div className="redactor__body d-flex flex-row flex-wrap align-items-center text-small">
                    {this._hasRedactor() && (
                        <div className="redactor__author d-flex align-items-center flex-shrink-0 mr-16 mb-6">
                            <img
                                data-src={this._getProfile().getAvatar().getSmall()}
                                alt={this._getProfile().getFullName()}
                                className="lazyload mr-6"
                                width="28"
                                height="28"
                            />

                            <span>
                                {this.stringsResource.editorialStaff}:&nbsp;
                                <a href={this._getProfile().getUrl()} target="_blank">
                                    {this._getRedactorName()}
                                </a>
                            </span>
                        </div>
                    )}

                    {this._isVerified() && (
                        <div className="redactor__author d-flex align-items-center flex-shrink-0 mr-16 mb-6">
                            <img
                                data-src={this._getReviewer().getAvatar().getSmall()}
                                alt={this._getReviewer().getFullName()}
                                className="lazyload mr-6"
                                width="28"
                                height="28"
                            />

                            <span>
                                {this.stringsResource.censor}:&nbsp;
                                <a href={this._getReviewer().getUrl()} target="_blank">
                                    {this._getReviewerName()}
                                </a>
                            </span>
                        </div>
                    )}

                    <div className="redactor__date d-flex d-md-block">
                        {this._hasPublishDate() && (
                            <div className="redactor__date-create d-flex align-items-center flex-shrink-0 mb-8">
                                {this.stringsResource.created}:&nbsp;
                                <time dateTime={this._getPublishDateAsISO()}>
                                    {this._getPublishDate()}
                                </time>
                            </div>
                        )}

                        <div className="redactor__date-update d-flex align-items-center flex-shrink-0 mr-16">
                            {this.stringsResource.updated}:&nbsp;
                            <time dateTime={this._getLastUpdateDateAsISO()}>
                                {this._getLastUpdateDate()}
                            </time>
                        </div>
                    </div>

                    {this._isVerified() && (
                        <div className="redactor__status flex-shrink-0 d-flex mb-6">
                            <a
                                href={this.Resource.links.editorialPolicy}
                                target="_blank"
                                className="d-flex align-items-center"
                            >
                                <i className="icon icon-done" />

                                <span className="f-weight-5">
                                    {this.stringsResource.verified}
                                </span>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

Redactor.propTypes = {
    profile: PropTypes.instanceOf(Object).isRequired,
    reviewer: PropTypes.instanceOf(Object).isRequired,
    lastUpdateDate: PropTypes.instanceOf(Date).isRequired,
    publishDate: PropTypes.instanceOf(Date),
    className: PropTypes.string,
    shortName: PropTypes.bool
};

Redactor.defaultProps = {
    className: "",
    publishDate: null,
    shortName: false
};

export default Redactor;
