import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import ModalDialogService from "app/core/services/modalDialog";

class Author extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

        /**
         * @property Resource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property env
         * @type {Env}
         */
        this.env = Env.getInstance();

        /**
         * @property modalDialogService
         * @type {ModalDialog}
         */
        this.modalDialogService = ModalDialogService.getInstance();

        this._showDescriptionAboutCompanyAgent = this._showDescriptionAboutCompanyAgent.bind(this);
    }

    /**
     * @private
     * @method _isBought
     * @returns {boolean}
     */
    _isBought() {
        return !this._hasCompanyAgent() && this._getThread().isBought();
    }

    /**
     * @private
     * @method _hasCompanyAgent
     * @returns {boolean}
     */
    _hasCompanyAgent() {
        return Boolean(this._getCompany().getId());
    }

    /**
     * @method _getThread
     * @return {Thread}
     * @private
     */
    _getThread() {
        return this.props.thread;
    }

    /**
     * @private
     * @method _getAuthor
     * @returns {Employee}
     */
    _getAuthor() {
        return this._getThread().getAuthor();
    }

    /**
     * @private
     * @method _getCompany
     * @returns {Company}
     */
    _getCompany() {
        return this._getAuthor().getCompany();
    }

    /**
     * @method _getURLForVerifiedIcon
     * @returns {string}
     * @private
     */
    _getURLForVerifiedIcon() {
        return this.Resource.links.images.verified;
    }

    /**
     * @private
     * @method _showDescriptionAboutCompanyAgent
     * @returns {void}
     */
    _showDescriptionAboutCompanyAgent() {
        this.modalDialogService.open({
            className: "verified-author",
            body: <p>{this.stringsResource.officialRepresentativeOfApteka24}</p>,
            size: this.modalDialogService.getSizes().getSm(),
            type: this.modalDialogService.getTypes().getInfo()
        });
    }

    /**
     * @public
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="author">
                <div className="author__header">
                    {this._getAuthor().getName()}

                    {this._isBought() && (
                        <span className="thread-review__already-bought">
                            <i className="icon icon-cart-check" title={this.stringsResource.alreadyBought} />
                            {/*<span>{this.stringsResource.alreadyBought}</span>*/}
                        </span>
                    )}

                    {this._hasCompanyAgent() && (
                        <div
                            className="thread-review__company-agent"
                            onClick={this._showDescriptionAboutCompanyAgent}
                        >
                            <img
                                src={this._getURLForVerifiedIcon()}
                                alt={this.stringsResource.companyRepresentative}
                                title={this.stringsResource.companyRepresentative}
                                width="18"
                                height="18"
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

Author.propTypes = {
    thread: PropTypes.instanceOf(Object).isRequired
};

export default Author;
