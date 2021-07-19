import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import LanguageEnum from "app/core/utilites/enum/language";

import Analytics from "./Analytics";

class InstallApp extends React.Component {
    constructor(props) {
        super(props);

        this.currentLanguage = Env.getInstance().getLanguage();

        this.Resource = Resource;
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        this.languageEnum = LanguageEnum.getInstance();

        /**
         * @property analytics
         * @type {Object}
         */
        this.analytics = new Analytics();

        this._clickOnAppStore = this._clickOnAppStore.bind(this);
        this._clickOnGooglePlay = this._clickOnGooglePlay.bind(this);
    }

    /**
     * @private
     * @method _isUaLocale
     * @returns {boolean}
     */
    _isUaLocale() {
        return this.languageEnum.isUa(this.currentLanguage);
    }

    /**
     * @private
     * @method _isRuLocale
     * @returns {boolean}
     */
    _isRuLocale() {
        return this.languageEnum.isRu(this.currentLanguage);
    }

    /**
     * @private
     * @method _clickOnAppStore
     * @returns {InstallApp}
     */
    _clickOnAppStore() {
        this.analytics.clickOnAppStore();

        return this;
    }

    /**
     * @private
     * @method _clickOnGooglePlay
     * @returns {InstallApp}
     */
    _clickOnGooglePlay() {
        this.analytics.clickOnGooglePlay();

        return this;
    }

    render() {
        return (
            <div className="install-app">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col d-lg-flex justify-content-between">
                            <div className="install-app__description d-lg-flex align-items-center">
                                <p>{this.HTMLResource.installApp.description}</p>

                                <div className="install-app__stores d-flex justify-content-center">
                                    <a
                                        onClick={this._clickOnAppStore}
                                        href={this.Resource.links.a24AppStore}
                                        target="_blank"
                                    >
                                        {this._isRuLocale() && (
                                            <img
                                                className="lazyload"
                                                src={this.Resource.links.images.installApp.appStore.ru}
                                                alt="App Store"
                                                width="128"
                                                height="40"
                                            />
                                        )}

                                        {this._isUaLocale() && (
                                            <img
                                                src={this.Resource.links.images.installApp.appStore.ua}
                                                alt="App Store"
                                                width="128"
                                                height="40"
                                            />
                                        )}

                                    </a>

                                    <a
                                        onClick={this._clickOnGooglePlay}
                                        href={this.Resource.links.a24GooglePlay}
                                        target="_blank"
                                    >
                                        {this._isRuLocale() && (
                                            <img
                                                src={this.Resource.links.images.installApp.googlePlay.ru}
                                                alt="Google Play"
                                                width="128"
                                                height="40"
                                            />
                                        )}

                                        {this._isUaLocale() && (
                                            <img
                                                src={this.Resource.links.images.installApp.googlePlay.ua}
                                                alt="Google Play"
                                                width="128"
                                                height="40"
                                            />
                                        )}

                                    </a>
                                </div>
                            </div>

                            <div className="install-app__preview">
                                <img
                                    className="lazyload"
                                    data-src={this.Resource.links.images.installApp.storePreview}
                                    alt="preview"
                                    width="290"
                                    height="147"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default InstallApp;
