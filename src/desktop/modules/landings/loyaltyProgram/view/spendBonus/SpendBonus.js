import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";
import LanguageEnum from "app/core/utilites/enum/language";

class SpendBonus extends React.Component {
    constructor(props) {
        super(props);

        this.currentLanguage = Env.getInstance().getLanguage();

        this.Resource = Resource;
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        this.languageEnum = LanguageEnum.getInstance();
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
     * @returns {React.element}
     */
    render() {
        return (
            <section className="spend-bonus section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-7">
                            <header className="spend-bonus__header">
                                <h2 className="section__title spend-bonus__title color-black line-height-1-5">
                                    {this.HTMLResource.loyaltyProgram.howToSpendBonus.title}
                                </h2>
                            </header>

                            <div className="spend-bonus__body">
                                <p>
                                    {this.HTMLResource.loyaltyProgram.howToSpendBonus.instruction}
                                </p>

                                <p>
                                    {this.HTMLResource.loyaltyProgram.howToSpendBonus.bonusProducts}
                                </p>
                            </div>
                        </div>

                        <div className="col-md-5">
                            {this._isRuLocale() && (
                                <img
                                    className="spend-bonus__image"
                                    src={this.Resource.links.images.loyaltyProgram.bonusPreview.ru}
                                    alt="img"
                                    width="295"
                                    height="450"
                                />
                            )}

                            {this._isUaLocale() && (
                                <img
                                    className="spend-bonus__image"
                                    src={this.Resource.links.images.loyaltyProgram.bonusPreview.ua}
                                    alt="img"
                                    width="295"
                                    height="450"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default SpendBonus;
