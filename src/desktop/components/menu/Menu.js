/* eslint-disable */

import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import classnames from "classnames";

import DesktopCascade from "./desktop-cascade/DesktopCascade";

const MobileMenu = dynamic(import("./mobile/Mobile"));

class Menu extends React.Component {
    /**
     * @method _isVisible
     * @return {boolean}
     * @private
     */
    _isVisible() {
        return Boolean(this.props.isOpen);
    }

    /**
     * @method _getCatalog
     * @return {Array}
     * @private
     */
    _getCatalog() {
        return this.props.catalog;
    }

    render() {
        return (
            <div
                className={classnames("catalog-menu", {
                    "d-block": this._isVisible(),
                    "d-none": !this._isVisible()
                })}
            >
                {this.props.isOpen && (
                    <DesktopCascade
                        toggleMenu={this.props.toggleMenu}
                        menu={this._getCatalog()}
                        eventName={this.props.eventName}
                    />
                )}

                {this.props.isOpen && (
                    <MobileMenu
                        className="d-xl-none"
                        catalog={this._getCatalog()}
                        navigation={this.props.mobileNavigation}
                        accountNavigation={this.props.accountNavigation}
                        screen={this.props.screen}
                        profile={this.props.profile}
                        toLogin={this.props.toLogin}
                        toLogout={this.props.toLogout}
                        close={this.props.toggleMenu}
                    />
                )}

                <div className="page-overlay" onClick={() => this.props.toggleMenu()} />
            </div>
        );
    }
}

Menu.propTypes = {
    catalog: PropTypes.instanceOf(Array),
    mobileNavigation: PropTypes.instanceOf(Array),
    accountNavigation: PropTypes.instanceOf(Array),
    profile: PropTypes.instanceOf(Object).isRequired,
    toLogin: PropTypes.func,
    toLogout: PropTypes.func
};

Menu.defaultProps = {
    catalog: [],
    mobileNavigation: [],
    accountNavigation: [],
    toLogin: () => {},
    toLogout: () => {}
};

export default Menu;
