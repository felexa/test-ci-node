/* eslint-disable react/prop-types,max-len */
import React from "react";

import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Title from "components/title/Title";

class About extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        this.state = { isCollapsedContent: true };

        this.toggleContentSize = this.toggleContentSize.bind(this);
    }

    toggleContentSize() {
        this.setState((prevState) => ({
            isCollapsedContent: !prevState.isCollapsedContent
        }));
    }

    render() {
        return (
            <section className="about rounded-16 bg-white new-super-box-shadow">
                <div className={classNames("about__body mb-16", { "about__body--collapsed": this.state.isCollapsedContent })}>

                    <section>
                        <Title config={{title: this.HTMLResource.home.about.title}} tag="h1" noGrid />

                        <p className="mb-24">
                            {this.HTMLResource.home.about.description}
                        </p>

                        <div className="mb-32">
                            <h2 className="mb-24">
                                {this.HTMLResource.home.about.advantages.title}
                            </h2>

                            <ul className="features-list">
                                <li>
                                    <i className="icon icon-done" />
                                    <span>
                                        {this.HTMLResource.home.about.advantages.hugeAssortment}
                                    </span>
                                </li>

                                <li>
                                    <i className="icon icon-done" />
                                    <span>
                                        {this.HTMLResource.home.about.advantages.delivery}
                                    </span>
                                </li>

                                <li>
                                    <i className="icon icon-done" />
                                    <span>
                                        {this.HTMLResource.home.about.advantages.discounts}
                                    </span>
                                </li>

                                <li>
                                    <i className="icon icon-done" />
                                    <span>
                                        {this.HTMLResource.home.about.advantages.manufacturersCooperation}
                                    </span>
                                </li>

                                <li>
                                    <i className="icon icon-done" />
                                    <span>
                                        {this.HTMLResource.home.about.advantages.qualityCertificates}
                                    </span>
                                </li>

                                <li>
                                    <i className="icon icon-done" />
                                    <span>
                                        {this.HTMLResource.home.about.advantages.medicalMarket}
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="mb-32">
                            <h2 className="mb-24">
                                {this.HTMLResource.home.about.assortment.title}
                            </h2>

                            <p>
                                {this.HTMLResource.home.about.assortment.productsFromCatalog}
                            </p>

                            <p>
                                {this.HTMLResource.home.about.assortment.productsHasInstruction}
                            </p>

                            <p>
                                {this.HTMLResource.home.about.assortment.youCanFindAllDrugs}
                            </p>

                            <ul
                                className="list-dotted"
                                dangerouslySetInnerHTML={{__html: this.HTMLResource.home.about.assortment.drugList}}
                            />
                        </div>

                        <div>
                            <h2 className="mb-24">{this.HTMLResource.home.about.howToGetOrder.title}</h2>

                            <p>{this.HTMLResource.home.about.howToGetOrder.suggestMethods}</p>

                            <ul
                                className="list-dotted mb-16"
                                dangerouslySetInnerHTML={{__html: this.HTMLResource.home.about.howToGetOrder.suggestMethodsList}}
                            />

                            <p className="mb-24">{this.HTMLResource.home.about.howToGetOrder.responsibility}</p>

                            <div className="cities rounded-16">
                                <ul>
                                    <li><a href="/pharmacy/kiev/">{this.stringsResource.cityNames.kiev}</a></li>
                                    <li><a href="/pharmacy/kharkov/">{this.stringsResource.cityNames.kharkov}</a></li>
                                    <li><a href="/pharmacy/dnepr/">{this.stringsResource.cityNames.dnepr}</a></li>
                                    <li><a href="/pharmacy/odessa/">{this.stringsResource.cityNames.odessa}</a></li>
                                    <li><a href="/pharmacy/rovno/">{this.stringsResource.cityNames.rovno}</a></li>
                                </ul>

                                <ul>
                                    <li><a href="/pharmacy/vinnitsa/">{this.stringsResource.cityNames.vinnitsa}</a></li>
                                    <li><a href="/pharmacy/zaporozhe/">{this.stringsResource.cityNames.zaporozhe}</a></li>
                                    <li><a href="/pharmacy/ivano-frankovsk/">{this.stringsResource.cityNames.ivanoFrankovsk}</a></li>
                                    <li><a href="/pharmacy/kramatorsk/">{this.stringsResource.cityNames.kramatorsk}</a></li>
                                    <li><a href="/pharmacy/kremenchug/">{this.stringsResource.cityNames.kremenchug}</a></li>
                                </ul>

                                <ul>
                                    <li><a href="/pharmacy/krivoy-rog/">{this.stringsResource.cityNames.krivoyRog}</a></li>
                                    <li><a href="/pharmacy/lvov/">{this.stringsResource.cityNames.lvov}</a></li>
                                    <li><a href="/pharmacy/nikolaev/">{this.stringsResource.cityNames.nikolaev}</a></li>
                                    <li><a href="/pharmacy/poltava/">{this.stringsResource.cityNames.poltava}</a></li>
                                    <li><a href="/pharmacy/sumy/">{this.stringsResource.cityNames.sumy}</a></li>
                                </ul>

                                <ul>
                                    <li><a href="/pharmacy/ternopol/">{this.stringsResource.cityNames.ternopol}</a></li>
                                    <li><a href="/pharmacy/kherson/">{this.stringsResource.cityNames.kherson}</a></li>
                                    <li><a href="/pharmacy/cherkassy/">{this.stringsResource.cityNames.cherkassy}</a></li>
                                    <li><a href="/pharmacy/chernovtsy/">{this.stringsResource.cityNames.chernovtsy}</a></li>
                                    <li><a href="/pharmacy/chernigov/">{this.stringsResource.cityNames.chernigov}</a></li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/*<div dangerouslySetInnerHTML={{__html: this.props.content }} />*/}
                </div>

                <div className="about__footer">
                    <div className="content-controls">
                        {this.state.isCollapsedContent && (
                            <span className="link-bordered" onClick={this.toggleContentSize}>
                                {this.stringsResource.readCompletely}
                            </span>
                        )}

                        {!this.state.isCollapsedContent && (
                            <span className="link-bordered" onClick={this.toggleContentSize}>
                                {this.stringsResource.show.less}
                            </span>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}

export default About;
