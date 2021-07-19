import React from 'react';

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Find extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
        this.env = Env.getInstance();
    }

    /**
     * @public
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <section className="how-to-section find">
                <header className="find__header">
                    <h2 className="how-to-section__title find__title">
                        {this.HTMLResource.about.howto.find}
                    </h2>
                </header>

                <div className="find__body">
                    <p className="find__description">
                        {this.HTMLResource.about.howto.searchMethods}
                    </p>

                    <div className="find__items">
                        <div className="find__item">
                            <p className="item__description">
                                <i className="icon icon-done" />

                                <span
                                    dangerouslySetInnerHTML={{__html: this.HTMLResource.about.howto.searchMethod1}}
                                />
                            </p>

                            <div className="item__preview box-shadow-6">
                                <img src="https://s3-eu-west-1.amazonaws.com/i-qa.apteka24.ua/find-1.png" alt="preview" />
                            </div>
                        </div>

                        <div className="find__item">
                            <p className="item__description">
                                <i className="icon icon-done" />

                                <span
                                    dangerouslySetInnerHTML={{__html: this.HTMLResource.about.howto.searchMethod2}}
                                />
                            </p>

                            <div className="item__preview box-shadow-6">
                                <img src="https://s3-eu-west-1.amazonaws.com/i-qa.apteka24.ua/find-2.png" alt="preview" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Find;
