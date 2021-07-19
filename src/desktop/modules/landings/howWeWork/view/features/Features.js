import React from "react";

import classnames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Features extends React.Component {
    constructor(props) {
        super(props);

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.features = this.HTMLResource.howWeWork.features.items;
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this.features.map((item, index) => (
            <div
                className={classnames("features-item item d-md-flex align-items-center")}
                key={index}
            >

                <div className="item__preview">
                    <img
                        src={item.icon.src.original}
                        alt={item.icon.alt}
                        width="633"
                        height="530"
                    />
                </div>

                <div className="item__body">
                    <h3 className="item__title f-weight-5">
                        {item.title}
                    </h3>

                    <div className="item__description line-height-1-5" dangerouslySetInnerHTML={{__html: item.description}} />
                </div>
            </div>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section className="features color-black">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <header className="features__header">
                                <h2 className="features__title how-it-works-section__title  color-black f-weight-5">
                                    {this.stringsResource.howWeWork}?
                                </h2>
                            </header>

                            <div className="features__body">
                                {this._renderItems()}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Features;
