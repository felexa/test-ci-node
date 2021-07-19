import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Analytics from "./Analytics";

class Telegram extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property analytics
         * @type {Object}
         */
        this.analytics = new Analytics();
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="telegram d-flex justify-content-between">
                <div className="telegram__column-left">
                    <a
                        href={this.Resource.links.telegramA24}
                        target="_blank"
                        onClick={() => this.analytics.joinTelegram()}
                    >
                        <img
                            className="telegram__preview"
                            width="68"
                            height="68"
                            src={this.Resource.links.images.telegram.preview}
                            alt="telegram"
                        />
                    </a>
                </div>

                <div className="telegram__column-right">
                    <div className="telegram__title mb-6 f-weight-5 color-black">
                        <span dangerouslySetInnerHTML={{__html: this.HTMLResource.telegram.title}} />

                        <a
                            href={this.Resource.links.telegramA24}
                            target="_blank"
                            onClick={() => this.analytics.joinTelegram()}
                        >
                            {this.HTMLResource.telegram.name}
                        </a>
                    </div>

                    <div className="telegram__description color-black">
                        {this.HTMLResource.telegram.description}
                    </div>
                </div>
            </section>
        );
    }
}

export default Telegram;
