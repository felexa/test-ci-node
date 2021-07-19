/* eslint-disable */

import React from "react";
import classnames from "classnames";
import {source, target} from "react-aim";

import Env from "app/core/environment";
import Resource from "app/core/resource";

@target({})
class SubMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = { hasSubmenu: false };
        this.submenuRef = React.createRef();

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.updateSubMenuState = this.updateSubMenuState.bind(this);
        this.getClassNameForSubmenu = this.getClassNameForSubmenu.bind(this);
        this.renderItems = this.renderItems.bind(this);
    }

    updateSubMenuState() {
        let submenuWrapper = this.submenuRef.current.querySelector('.submenu-wrapper');

        this.setState({ hasSubmenu: Boolean(submenuWrapper) });

        submenuWrapper.style.top = "-1px";
        submenuWrapper.style.bottom = "-1px";
    }

    getClassNameForSubmenu() {
        return classnames("submenu-wrapper bg-white", { "submenu-wrapper--nested": this.state.hasSubmenu });
    }

    renderItems() {
        return (
            this.props.items.map((item) => (
                <Item key={item.id} item={item} subMenu={item.childrens} updateSubMenuState={this.updateSubMenuState} />
            ))
        );
    }

    render() {
        return (
            <div className={this.getClassNameForSubmenu()} ref={this.submenuRef}>
                <ul className="submenu">{ this.renderItems() }</ul>

                <div className="submenu-wrapper__footer">
                    <a className="all-categories" href={this.props.parentUrl}>
                        {this.stringsResource.allCategories}
                    </a>
                </div>
            </div>
        );
    }
}

@source({
    mouseEnter: (props, component) => {
        component.setState({ over: true }, () => {

            if (props.subMenu && props.subMenu.length) {
                props.updateSubMenuState(true);
            }
        });
    },
    mouseLeave: (props, component) => {
        component.setState({ over: false });

        if (props.subMenu && props.subMenu.length) {
            props.updateSubMenuState(false);
        }
    }
})
class Item extends React.Component {
    constructor(props) {
        super(props);

        this.env = Env.getInstance();

        this.renderSubMenu = this.renderSubMenu.bind(this);
        this.shouldRenderSubmenu = this.shouldRenderSubmenu.bind(this);
        this.isSubmenuExist = this.isSubmenuExist.bind(this);
        this.isItemLogoExist = this.isItemLogoExist.bind(this);
        this.renderItemLogo = this.renderItemLogo.bind(this);

        this.state = {
            over: false
        };

        this.submenuRef = React.createRef();
    }

    isSubmenuExist() {
        return Boolean(this.props.subMenu && this.props.subMenu.length);
    }

    shouldRenderSubmenu() {
        return this.state.over && this.isSubmenuExist()
    }

    renderSubMenu() {
        return (
            <SubMenu
                items={this.props.subMenu}
                parentUrl={this.replaceUrlHostname(this.props.item.url)}
                setNested={this.props.setNested}
            />
        );
    }

    isItemLogoExist() {
        return (this.props.item.icon && this.props.showIcon);
    }

    renderItemLogo() {
        return (<img width="26" height="26" data-src={this.props.item.icon} alt="" className="lazyload" />)
    }

    // TODO this url should be replaced in api
    replaceUrlHostname(url) {
        return url.replace("https://www.apteka24.ua", this.env.getBitrixHost());
    }

    render() {
        return (
            <li ref={this.submenuRef}>
                {(this.shouldRenderSubmenu()) && this.renderSubMenu()}

                <a href={this.replaceUrlHostname(this.props.item.url)}>
                    <span className="d-flex align-items-center">
                        { this.isItemLogoExist() && this.renderItemLogo() }

                        <span>{ this.props.item && this.props.item.name }</span>
                    </span>

                    {this.isSubmenuExist() && <i className="icon icon-chevron-right" />}
                </a>
            </li>
        );
    }
}

export default Item;
