/* eslint-disable max-len */
import React from "react";
import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import LanguageEnum from "app/core/utilites/enum/language";

import Box from "app/core/components/Box";

class GetBonus extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            execCommand: false,
            isNotice: false
        };

        this.currentLanguage = Env.getInstance().getLanguage();

        this.Resource = Resource;
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.languageEnum = LanguageEnum.getInstance();

        this.promoCode = "MORKOVKA";

        this._copyPromoCode = this._copyPromoCode.bind(this);
    }

    /**
     * @protected
     * @method componentDidMount
     * @returns {void}
     */
    componentDidMount() {
        this._setExecCommandStatus();
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
     * @method _setExecCommandStatus
     * @returns {Boolean}
     */
    _setExecCommandStatus() {
        let execCommandStatus = Boolean(window.document.execCommand);

        this.setState({execCommand: execCommandStatus});
    }

    /**
     * @public
     * @method _getExecCommandStatus
     * @returns {Boolean}
     */
    _getExecCommandStatus() {
        return this.state.execCommand;
    }

    /**
     * @public
     * @method _copyPromoCode
     * @returns {GetBonus}
     */
    _showNotice() {
        this.setState({isNotice: true});

        setTimeout(() => this.setState({isNotice: false}), 2000);

        return this;
    }

    /**
     * @public
     * @method _copyPromoCode
     * @returns {GetBonus}
     */
    _copyPromoCode() {
        this.textArea = document.querySelector(".promo__code-input");
        this.textArea.select();

        window.document.execCommand('copy');

        this._showNotice();

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section className="get-bonus section">
                <div className="container-fluid">
                    <header className="get-bonus__header">
                        <h2 className="section__title get-bonus__title line-height-1-5 color-black text-center">
                            {this.HTMLResource.loyaltyProgram.howToGetBonus.title}
                        </h2>

                        <div className="get-bonus__promo text-center">
                            <div
                                className="promo__description color-black"
                                dangerouslySetInnerHTML={{__html: this.HTMLResource.loyaltyProgram.howToGetBonus.promoDescription}}
                            />

                            <div className="promo__code d-flex align-items-center justify-content-center">
                                <input
                                    className="promo__code-input d-flex align-items-center justify-content-center"
                                    type="text"
                                    value={this.promoCode}
                                    onChange={() => {}}
                                    readOnly
                                />

                                {this._getExecCommandStatus() && (
                                    <button
                                        onClick={this._copyPromoCode}
                                        type="button"
                                    />
                                )}
                            </div>

                            <div className={classNames('notice color-white', {active: this.state.isNotice})}>
                                <i className="icon icon-done" />
                                {this.stringsResource.codeCopied}
                            </div>

                            <div className="promo__next-point color-black">
                                {this.HTMLResource.loyaltyProgram.howToGetBonus.nextPoints}
                            </div>
                        </div>
                    </header>

                    <div className="get-bonus__body">
                        <Box
                            component="div"
                            rounded={16}
                            className="content-box get-bonus__instruction bg-white new-super-box-shadow color-black text-center line-height-1-5"
                        >
                            <div className="content-box__preview d-flex align-items-center justify-content-center">
                                <img
                                    src={this.Resource.links.icons.instruction}
                                    alt="preview"
                                    width="44"
                                    height="44"
                                />
                            </div>

                            <p dangerouslySetInnerHTML={{__html: this.HTMLResource.loyaltyProgram.howToGetBonus.bonusRules}} />

                            <p dangerouslySetInnerHTML={{__html: this.HTMLResource.loyaltyProgram.howToGetBonus.reviewRequirements}} />

                            <div className="instruction__review-example">
                                {this._isRuLocale() && (
                                    <>
                                        <img
                                            className="d-none d-md-block"
                                            src={this.Resource.links.images.loyaltyProgram.review.desktop.ru}
                                            alt="review"
                                            width="1020"
                                            height="214"
                                        />

                                        <img
                                            className="d-md-none"
                                            src={this.Resource.links.images.loyaltyProgram.review.mobile.ru}
                                            alt="review"
                                            width="320"
                                            height="340"
                                        />
                                    </>
                                )}

                                {this._isUaLocale() && (
                                    <>
                                        <img
                                            className="d-none d-md-block"
                                            src={this.Resource.links.images.loyaltyProgram.review.desktop.ua}
                                            alt="review"
                                            width="1020"
                                            height="214"
                                        />

                                        <img
                                            className="d-md-none"
                                            src={this.Resource.links.images.loyaltyProgram.review.mobile.ua}
                                            alt="review"
                                            width="320"
                                            height="340"
                                        />
                                    </>
                                )}

                            </div>
                        </Box>

                        <Box
                            component="div"
                            rounded={16}
                            className="content-box get-bonus__cashback bg-white new-super-box-shadow color-black text-center line-height-1-5"
                        >
                            <div className="content-box__preview d-flex align-items-center justify-content-center">
                                <img
                                    src={this.Resource.links.images.loyaltyProgram.cashback}
                                    alt="preview"
                                    width="60"
                                    height="60"
                                />
                            </div>

                            <p dangerouslySetInnerHTML={{__html: this.HTMLResource.loyaltyProgram.howToGetBonus.cashbackRules}} />

                            <p
                                className="cashback__note"
                                dangerouslySetInnerHTML={{__html: this.HTMLResource.loyaltyProgram.howToGetBonus.note}}
                            />
                        </Box>
                    </div>
                </div>
            </section>
        );
    }
}

export default GetBonus;
