import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import MicroData from "./MicroData";

class Breadcrumbs extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property env
         * @type {Env}
         */
        this.env = Env.getInstance();
    }

    /**
     * @private
     * @method getItems
     * @returns {Array}
     */
    getItems() {
        return this.props.items;
    }

    /**
     * @method getBreadcrumbsModificationClass
     * @returns {string}
     */
    getBreadcrumbsModificationClass() {
        return this.getItems().length >= 1 ? "" : "breadcrumbs__empty";
    }

    /**
     * @method renderItems
     * @returns {Array}
     */
    renderItems() {
        return this.getItems().map(function (item, index) {
            return (
                <li className="item" key={index}>
                    {item.url && <a href={item.url}>{item.name}</a>}
                    {item.url && <i className="icon icon-chevron-right" />}

                    {!item.url && <span className="current-page">{item.name}</span>}
                </li>
            );
        });
    }

    render() {
        return (
            <div className={`breadcrumbs ${this.getBreadcrumbsModificationClass()}`}>
                <ul className="breadcrumbs__items custom-scroll">
                    <li className="item item__home-page">
                        <span className="d-flex">
                            {/*<i className="icon icon-chevron-left d-md-none" />*/}

                            <a href={this.env.getBitrixHost()} className="d-flex align-items-center home-page-link">
                                <i className="icon icon-home" />

                                <span className="home-page-link__text">
                                    {this.stringsResource.home}
                                </span>

                            </a>

                            <i className="icon icon-chevron-right" />
                        </span>
                    </li>

                    {this.renderItems()}
                </ul>
                <MicroData breadCrumbs={this.getItems()} />
            </div>
        );
    }
}

Breadcrumbs.propTypes = {
    items: PropTypes.instanceOf(Array)
};

Breadcrumbs.defaultProps = {
    items: []
};

export default Breadcrumbs;
