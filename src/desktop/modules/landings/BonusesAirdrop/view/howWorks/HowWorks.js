import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class HowWorks extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        this.items = this.HTMLResource.bonusesAirdrop.howWorks.items;
    }

    /**
     * @method _renderItems
     * @return {Array}
     * @private
     */
    _renderItems() {
        return this.items.map((item, index) => (
            <li className="item" key={index}>
                <img
                    className="item__preview"
                    src={item.preview}
                    alt="img"
                    width="140"
                    height="140"
                />

                <p
                    className="item__description color-black"
                    dangerouslySetInnerHTML={{__html: item.description}}
                />
            </li>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="bonuses-airdrop__how-works how-works section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <header className="how-works__header">
                                <h2 className="how-works__title section__title">
                                    {this.HTMLResource.bonusesAirdrop.howWorks.title}
                                </h2>
                            </header>

                            <div className="how-works__body">
                                <ul className="how-works__items">
                                    {this._renderItems()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default HowWorks;
