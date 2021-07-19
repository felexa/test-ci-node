/* eslint-disable max-len */
import React from "react";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import MicroDataWebPage from "components/microData/WebPage";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import LanguageEnum from "app/core/utilites/enum/language";

import styles from "../styles/main.module.scss";

class WhoAllowed extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property currentLanguage
         * @type {String}
         */
        this.currentLanguage = Env.getInstance().getLanguage();

        /**
         * @property HTMLResource
         * @type {Resource}
         */
        this.HTMLResource = Resource.getHTML(this.currentLanguage);

        /**
         * @property linksResource
         * @type {Resource}
         */
        this.linksResource = Resource.links;

        /**
         * @property languageEnum
         * @type {Enum}
         */
        this.languageEnum = LanguageEnum.getInstance();
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
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="who-allowed">
                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                <style jsx>
                    {styles}
                </style>

                <div className="container-fluid">
                    <div className="row">
                        <header className="who-allowed__header">
                            <h1 className="color-black f-weight-5">
                                { this.HTMLResource.whoAllowed.title }
                            </h1>

                            <div className="who-allowed__properties rounded-16">
                                <p className="properties__title">
                                    { this.HTMLResource.whoAllowed.properties.title }
                                </p>

                                <ul className="properties__items">
                                    <li className="properties__item">{ this.HTMLResource.whoAllowed.properties.items.allergy }</li>
                                    <li className="properties__item">{ this.HTMLResource.whoAllowed.properties.items.drivers }</li>
                                    <li className="properties__item">{ this.HTMLResource.whoAllowed.properties.items.lactating }</li>
                                    <li className="properties__item">{ this.HTMLResource.whoAllowed.properties.items.diabetics }</li>
                                    <li className="properties__item">{ this.HTMLResource.whoAllowed.properties.items.pregnant }</li>
                                    <li className="properties__item">{ this.HTMLResource.whoAllowed.properties.items.child }</li>
                                </ul>
                            </div>
                        </header>

                        <div className="who-allowed__body w-100">
                            <section className="how-to-use who-allowed__how-to-use who-allowed__section">
                                <header className="how-to-use__header section__header">
                                    <h2>
                                        { this.HTMLResource.whoAllowed.howToUse.title }
                                    </h2>
                                </header>

                                <div className="how-to-use__body">
                                    <div className="who-allowed__tip">
                                        { this.HTMLResource.whoAllowed.howToUse.firstTip }
                                    </div>

                                    {this._isRuLocale() && (
                                        <picture>
                                            <source
                                                srcSet={this.linksResource.images.whoAllowed.desktop.ru.whoCan}
                                                media="(min-width: 650px)"
                                            />

                                            <img
                                                src={this.linksResource.images.whoAllowed.mobile.ru.whoCan}
                                                alt="preview"
                                            />
                                        </picture>
                                    )}

                                    {this._isUaLocale() && (
                                        <picture>
                                            <source
                                                srcSet={this.linksResource.images.whoAllowed.desktop.ua.whoCan}
                                                media="(min-width: 650px)"
                                            />

                                            <img
                                                src={this.linksResource.images.whoAllowed.mobile.ua.whoCan}
                                                alt="preview"
                                            />
                                        </picture>
                                    )}

                                    <div
                                        className="who-allowed__tip"
                                        dangerouslySetInnerHTML={{__html: this.HTMLResource.whoAllowed.howToUse.secondTip}}
                                    />

                                    {this._isRuLocale() && (
                                        <picture>
                                            <source
                                                srcSet={this.linksResource.images.whoAllowed.desktop.ru.carefully}
                                                media="(min-width: 650px)"
                                            />

                                            <img
                                                src={this.linksResource.images.whoAllowed.mobile.ru.carefully}
                                                alt="preview"
                                            />
                                        </picture>
                                    )}

                                    {this._isUaLocale() && (
                                        <picture>
                                            <source
                                                srcSet={this.linksResource.images.whoAllowed.desktop.ua.carefully}
                                                media="(min-width: 650px)"
                                            />

                                            <img
                                                src={this.linksResource.images.whoAllowed.mobile.ua.carefully}
                                                alt="preview"
                                            />
                                        </picture>
                                    )}
                                </div>
                            </section>

                            <section className="what-means who-allowed__what-means who-allowed__section">
                                <header className="what-means__header section__header">
                                    <h2>
                                        { this.HTMLResource.whoAllowed.whatMeans.title }
                                    </h2>
                                </header>

                                <div className="what-means__body">
                                    <p>
                                        { this.HTMLResource.whoAllowed.whatMeans.description }
                                    </p>

                                    <div className="who-allowed__tip">
                                        { this.HTMLResource.whoAllowed.whatMeans.tip }
                                    </div>

                                    {this._isRuLocale() && (
                                        <picture>
                                            <source
                                                srcSet={this.linksResource.images.whoAllowed.desktop.ru.children}
                                                media="(min-width: 650px)"
                                            />

                                            <img
                                                src={this.linksResource.images.whoAllowed.mobile.ru.children}
                                                alt="preview"
                                            />
                                        </picture>
                                    )}

                                    {this._isUaLocale() && (
                                        <picture>
                                            <source
                                                srcSet={this.linksResource.images.whoAllowed.desktop.ua.children}
                                                media="(min-width: 650px)"
                                            />

                                            <img
                                                src={this.linksResource.images.whoAllowed.mobile.ua.children}
                                                alt="preview"
                                            />
                                        </picture>
                                    )}

                                    <div className="values">
                                        <div className="values__items d-flex justify-content-around flex-wrap">
                                            <div className="values__item rounded-16 new-super-box-shadow">
                                                <div className="item__icon">
                                                    <img
                                                        src={this.linksResource.icons.allowed}
                                                        alt="icon"
                                                    />
                                                </div>

                                                <div className="item__title f-weight-5">
                                                    { this.HTMLResource.whoAllowed.values.allowed.title }
                                                </div>

                                                <div className="item__description">
                                                    { this.HTMLResource.whoAllowed.values.allowed.description }
                                                </div>
                                            </div>

                                            <div className="values__item rounded-16 new-super-box-shadow">
                                                <div className="item__icon">
                                                    <img
                                                        src={this.linksResource.icons.carefully}
                                                        alt="icon"
                                                    />
                                                </div>

                                                <div className="item__title f-weight-5">
                                                    { this.HTMLResource.whoAllowed.values.carefully.title }
                                                </div>

                                                <div className="item__description">
                                                    { this.HTMLResource.whoAllowed.values.carefully.description }
                                                </div>
                                            </div>

                                            <div className="values__item rounded-16 new-super-box-shadow">
                                                <div className="item__icon">
                                                    <img
                                                        src={this.linksResource.icons.disallowed}
                                                        alt="icon"
                                                    />
                                                </div>

                                                <div className="item__title f-weight-5">
                                                    { this.HTMLResource.whoAllowed.values.disallowed.title }
                                                </div>

                                                <div className="item__description">
                                                    { this.HTMLResource.whoAllowed.values.disallowed.description }
                                                </div>
                                            </div>

                                            <div className="values__item rounded-16 new-super-box-shadow">
                                                <div className="item__icon">
                                                    <img
                                                        src={this.linksResource.icons.noData}
                                                        alt="icon"
                                                    />
                                                </div>

                                                <div className="item__title f-weight-5">
                                                    { this.HTMLResource.whoAllowed.values.noData.title }
                                                </div>

                                                <div className="item__description">
                                                    { this.HTMLResource.whoAllowed.values.noData.description }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="what-means__for-child rounded-16 d-flex align-items-center">
                                        <p
                                            dangerouslySetInnerHTML={{__html: this.HTMLResource.whoAllowed.children.description}}
                                        />

                                        <div className="property d-flex align-items-center">
                                            <div className="property__icon">
                                                <img
                                                    src={this.linksResource.images.whoAllowed.cautionChildren}
                                                    alt="icon"
                                                />
                                            </div>

                                            <div>
                                                <p className="property__title">
                                                    { this.HTMLResource.whoAllowed.children.title }
                                                </p>

                                                <p className="property__value">
                                                    { this.HTMLResource.whoAllowed.children.value }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <footer className="who-allowed__footer">
                            <div className="who-allowed__warning alert-danger">
                                { this.HTMLResource.whoAllowed.alert }
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}

export default WhoAllowed;
