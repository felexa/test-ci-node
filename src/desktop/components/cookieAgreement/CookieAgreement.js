/* eslint-disable max-len */
/* eslint-disable react/no-unused-state */
import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import LocalStorage from "app/core/utilites/storage/localStorage/index";
import LocalStorageEnum from "app/core/utilites/enum/localStorageName/index";

class CookieAgreement extends React.Component {
    constructor(props) {
        super(props);

        this.state = { isAccepted: true };

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

        this.localStorage = LocalStorage.getInstance();
        this.localStorageEnum = LocalStorageEnum.getInstance();

        this._accept = this._accept.bind(this);
    }

    componentDidMount() {
        this.setState({
            isAccepted: Boolean(this.localStorage.getItem(this.localStorageEnum.getCookieAgreementAsValue()))
        });
    }

    /**
     * @method {_accept}
     * @return {CookieAgreement}
     * @private
     */
    _accept() {
        this.localStorage.setItem(this.localStorageEnum.getCookieAgreementAsValue(), "true");

        this.setState({ isAccepted: true });

        return this;
    }

    render() {
        return !this.state.isAccepted && (
            <div className="cookie-agreement rounded-16 new-super-box-shadow">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="cookie-agreement__body">
                                <div className="d-flex flex-column flex-lg-row justify-content-lg-between align-items-lg-center">
                                    <div className="cookie-agreement__icon d-flex align-items-center justify-content-center">
                                        <img
                                            alt="cookies"
                                            src="https://i.apteka24.ua/attributes/cookies.svg"
                                        />
                                    </div>

                                    <div className="text-center text-lg-left">
                                        <p dangerouslySetInnerHTML={{__html: this.HTMLResource.cookieAgreement.description}} />
                                    </div>

                                    <div className="text-center">
                                        <button
                                            onClick={this._accept}
                                            className="btn-default--outline btn-md text-uppercase mt-16 mt-lg-0"
                                            type="button"
                                        >
                                            {this.stringsResource.accept}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CookieAgreement;
