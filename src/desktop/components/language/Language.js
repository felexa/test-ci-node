/*eslint-disable max-len*/
import React from "react";
import classNames from "classnames";

import Env from "app/core/environment";
import LanguageEnum from "app/core/utilites/enum/language";

class Language extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property languageEnum
         * @type {Enum}
         */
        this.languageEnum = LanguageEnum.getInstance();
        this.env = Env.getInstance();
        this.urlUa = "";
        this.urlRu = "";
    }

    componentDidMount() {
        this.urlUa = this._buildLinkForLanguageToggle(this.languageEnum.getUaAsValue());
        this.urlRu = this._buildLinkForLanguageToggle(this.languageEnum.getRuAsValue());
    }

    /**
     * @method _isUA
     * @returns {boolean}
     * @private
     */
    _isUA() {
        return this.languageEnum.isUa(this._getCurrentLanguage());
    }

    /**
     * @method _isRU
     * @returns {boolean}
     * @private
     */
    _isRU() {
        return this.languageEnum.isRu(this._getCurrentLanguage());
    }

    /**
     * @method _buildLinkForLanguageToggle
     * @param lang {string}
     * @returns {string}
     * @private
     */
    _buildLinkForLanguageToggle(lang) {
        let path = window.location
                .pathname
                .replace(`/${this.languageEnum.getRuAsValue()}/`, "/")
                .replace(`/${this.languageEnum.getUaAsValue()}/`, "/"),
            query = window.location.search,
            urlWithLang = this.languageEnum.isUa(lang) ? `${this.env.getBitrixHost()}/${this.languageEnum.getUaAsValue()}${path}${query}` : `${this.env.getBitrixHost()}${path}${query}`;

        return urlWithLang;
    }

    /**
     * @method _getCurrentLanguage
     * @returns {string}
     * @private
     */
    _getCurrentLanguage() {
        return this.env.getLanguage();
    }

    /**
     * @method _changeLanguage
     * @param lang {string}
     * @returns {Language}
     * @private
     */
    _changeLanguage(lang) {
        let path = window.location
                .pathname
                .replace(`/${this.languageEnum.getRuAsValue()}/`, "/")
                .replace(`/${this.languageEnum.getUaAsValue()}/`, "/"),
            query = window.location.search;

        if (this._getCurrentLanguage() !== lang) {
            setTimeout(() => {
                window.location.href = this.languageEnum.isUa(lang) ? `/${this.languageEnum.getUaAsValue()}${path}${query}` : `${path}${query}`;

                // window.location.reload();
            }, 150);
        }

        return this;
    }

    /**
     * @method _disableLink
     * @param e {Object}
     * @returns {void}
     * @private
     */
    _disableLink(e) {
        e.preventDefault();
    }

    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <ul className="language">
                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                <li
                    className={classNames({active: this._isRU()})}
                    onClick={() => this._changeLanguage(this.languageEnum.getRuAsValue())}
                >
                    {this._isRU() && (<span>RU</span>)}
                    {!this._isRU() && (<a onClick={this._disableLink} className="text-decoration-none color-white" href={this.urlRu}>RU</a>)}
                </li>

                {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                <li
                    className={classNames({active: this._isUA()})}
                    onClick={() => this._changeLanguage(this.languageEnum.getUaAsValue())}
                >
                    {this._isUA() && (<span>UA</span>)}
                    {!this._isUA() && (<a onClick={this._disableLink} className="text-decoration-none color-white" href={this.urlUa}>UA</a>)}
                </li>
            </ul>
        );
    }
}

export default Language;
