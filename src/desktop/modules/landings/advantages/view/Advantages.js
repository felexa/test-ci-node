import React from "react";
import classNames from "classnames";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Dom from "app/core/utilites/dom";

import MicroDataWebPage from "components/microData/WebPage";

import styles from "../styles/main.module.scss";

class Advantages extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        /**
         * @property Dom
         * @type {Dom}
         */
        this.Dom = Dom.getInstance();

        /**
         * @property selectors
         * @type {Object}
         */
        this.selectors = {
            scrollTo: ".advantages__body"
        };
    }

    /**
     * @private
     * @method _hasLink
     * @param section {Object}
     * @returns {boolean}
     */
    _hasLink(section) {
        return Boolean(section.link);
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
     * @method _renderSections
     * @returns {React.ReactElement}
     */
    _renderSections() {
        return this.HTMLResource.advantages.sections.map((item, index) => (
            <div className="advantages__section color-black" key={index}>
                <div className="container-fluid">
                    <div className={classNames("row justify-content-center justify-content-md-between align-items-center", {"flex-md-row-reverse": !(index % 2)})}>
                        <div className="col-md-6">
                            <h2 className="section__title f-weight-5">
                                {item.title}
                            </h2>

                            <div className="section__description" dangerouslySetInnerHTML={{__html: item.text}} />

                            {this._hasLink(item) && (
                                <a href={item.href} className="section__link">
                                    {item.link}
                                </a>
                            )}
                        </div>

                        <div className="col-md-6">
                            <div className="section__preview">
                                <img src={item.image} alt="Preview" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="advantages">
                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                <style jsx>
                    {styles}
                </style>

                <header className="advantages__header color-black">
                    <div className="container-fluid">
                        <div className="row justify-content-center justify-content-md-between align-items-center">
                            <div className="col-md-6">
                                <h1 className="header__title f-weight-5">
                                    {this.HTMLResource.advantages.title}
                                </h1>

                                <div className="header__description line-height-1-5">
                                    <p>
                                        {this.HTMLResource.advantages.description.creatingPharmacy}
                                    </p>

                                    <p>
                                        {this.HTMLResource.advantages.description.listedAdvantages}
                                        <img className="icon-smile" src={this.Resource.links.icons.smile} alt="Preview" />
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="header__preview">
                                    <img src={this.HTMLResource.advantages.image} alt="Preview" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="header__scroll-line">
                        <button
                            className="header__arrow-down bouncing d-flex align-items-center justify-content-center cursor-pointer"
                            onClick={() => this.Dom.scrollToElementWithOffset(this.selectors.scrollTo, 0, 30)}
                            type="button"
                        >
                            <img src={this.Resource.links.images.advantages.scrollBtn} alt="arrow down" />
                        </button>
                    </div>
                </header>

                <div className="advantages__body">
                    { this._renderSections() }
                </div>
            </section>
        );
    }
}

export default Advantages;
