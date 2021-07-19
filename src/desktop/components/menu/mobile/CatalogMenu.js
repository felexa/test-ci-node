/* eslint-disable react/prop-types */

import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class CatalogMenu extends React.Component {
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

    // TODO this url should be replaced in api
    replaceUrlHostname(url) {
        return (url && url.replace("https://www.apteka24.ua", this.env.getBitrixHost())) || "";
    }

    render() {
        return (
            <div className="mobile-catalog-menu d-flex flex-column h-100">
                <div onClick={this.props.config.stepBack} className="mobile-catalog-menu__header d-flex align-items-center">
                    <button type="button" className="d-inline-flex justify-content-end align-items-center">
                        <i className="icon icon-arrow-left" />
                    </button>

                    <span>{this.props.config.title}</span>
                </div>

                <div className="mobile-catalog-menu__body">
                    {
                        this.props.config.items.map((child) => (
                            <div className="menu-item" onClick={() => { this.props.config.renderNextScreen(child); }} key={child.id}>
                                <span className="menu-item__body d-flex align-items-center justify-content-between w-100">
                                    <span className="d-flex align-items-center f-weight-4 w-100">
                                        { child.icon && (
                                            <img src={child.icon} alt="" width={23} height={23} />
                                        )}

                                        {!(child.items && child.items.length) && (
                                            <a
                                                className="flex-grow-1 d-flex"
                                                href={this.replaceUrlHostname(child.url)}
                                            >
                                                {child.name || child.title}
                                            </a>
                                        )}

                                        { Boolean(child.items && child.items.length) && child.name }
                                    </span>

                                    { Boolean(child.items && child.items.length) && <i className="icon icon-chevron-right" /> }
                                </span>
                            </div>
                        ))
                    }

                    {
                        this.props.config.parentCategoryUrl && (
                            <div className="menu-item menu-item--all-categories">
                                <a href={this.replaceUrlHostname(this.props.config.parentCategoryUrl)} className="text-uppercase">
                                    {this.stringsResource.allCategories}
                                </a>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default CatalogMenu;
