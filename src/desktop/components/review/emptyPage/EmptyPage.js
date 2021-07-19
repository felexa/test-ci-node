/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

import Avatar from "components/avatar/Avatar";
import Resource from "app/core/resource";
import Env from "app/core/environment";

class EmptyPage extends React.Component {
    constructor(props) {
        super(props);
        /**
         * @property _linksResource
         * @type {Resource}
         */
        this._linksResource = Resource.links;

        /**
         * @property
         * @type {Object}
         */
        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this._HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @private
     * @method _getAvatar
     * @returns {JSX.Element}
     */
    _getAvatar() {
        let result = <img src={this._linksResource.icons.defaultAvatarUrl} alt="avatar" width="48" height="48" />;

        // eslint-disable-next-line no-extra-boolean-cast
        if (this.props.isAuthorized) {
            result = <Avatar profile={this.props.profile} size={48} />;
        }

        return result;
    }

    /**
     * @private
     * @method _getMotivatingMessage
     * @returns {string}
     */
    _getMotivatingMessage() {
        let result = `${this._stringsResource.review.youHaveAlreadyPurchasedThisItem}?`;

        if (this.props.isAuthorized) {
            result = `${this.props.profile.getName()}, ${this._stringsResource.review.youHaveAlreadyPurchasedThisItem.toLowerCase()}?`;
        }

        return result;
    }

    /**
     * @private
     * @method _getCreatingButtonName
     * @returns {string}
     */
    _getCreatingButtonName() {
        return this.props.isAuthorized ? this._stringsResource.review.create : this._stringsResource.review.loginAndCreate;
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className="d-flex align-items-center flex-column text-center">
                {this._getAvatar()}
                <p className="review__motivating-message">{this._getMotivatingMessage()}</p>
                <p className="review__motivating-text m-0 text-center" dangerouslySetInnerHTML={{__html: this._HTMLResource.review.createReviewText}} />

                <div className="review__alert">
                    <div className="review__alert-bonus">
                        <img src={this._linksResource.icons.carrotColored} alt="bonus" width="24" height="24" />
                    </div>
                    {!this.props.withComments && (
                    <span className="mb-6" dangerouslySetInnerHTML={{__html: this._HTMLResource.review.createFirstReviewAlert}} />
                    )}
                    {this.props.withComments && (
                        <span className="mb-6" dangerouslySetInnerHTML={{__html: this._HTMLResource.review.createReviewAlert}} />
                    )}
                </div>

                <button
                    type="button"
                    className="btn-default btn-md btn-block text-uppercase review__to-login-and-create"
                    onClick={this.props.toCreateReview}
                >
                    {this._getCreatingButtonName()}
                </button>

            </div>
        );
    }
}

EmptyPage.propTypes = {
    profile: PropTypes.instanceOf(Object).isRequired,
    isAuthorized: PropTypes.bool,
    toCreateReview: PropTypes.func,
    withComments: PropTypes.bool
};

EmptyPage.defaultProps = {
    isAuthorized: false,
    toCreateReview: () => {},
    withComments: false
};

export default EmptyPage;
