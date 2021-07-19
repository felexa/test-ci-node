import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Item from "desktop/components/menu/desktop-cascade/Item";

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = { hasSubmenu: false };

        this.submenuRef = React.createRef();

        this.closeMenu = this.closeMenu.bind(this);
        this.getClassNamesForMenuList = this.getClassNamesForMenuList.bind(this);
        this.updateSubMenuState = this.updateSubMenuState.bind(this);
        this.renderItems = this.renderItems.bind(this);
    }

    closeMenu(e) {
        if (e.target.classList.contains("menu__body")) {
            this.props.toggleMenu(e);
        }
    }

    getClassNamesForMenuList() {
        return classnames("menu-list bg-white", { "menu-list--nested": this.state.hasSubmenu });
    }

    updateSubMenuState() {
        this.setState({ hasSubmenu: Boolean(this.submenuRef.current.querySelector('.submenu-wrapper')) });
    }

    renderItems() {
        return (
            this.props.menu.map((item) => (
                <Item
                    key={item.id}
                    item={item}
                    subMenu={item.subItems}
                    showIcon
                    updateSubMenuState={this.updateSubMenuState}
                />
            ))
        );
    }

    render() {
        return (
            // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
            <div className="menu" onMouseOver={this.props.onMouseOver}>
                <div className="menu__body" onClickCapture={this.closeMenu}>
                    <ul
                        className={this.getClassNamesForMenuList()}
                        ref={this.submenuRef}
                        onMouseLeave={this.props.closeMenuByMouseLeave}
                    >
                        { this.renderItems() }
                    </ul>
                </div>
            </div>
        );
    }
}

Menu.propTypes = {
    menu: PropTypes.arrayOf(PropTypes.shape({})),
    toggleMenu: PropTypes.func,
    onMouseOver: PropTypes.func,
    closeMenuByMouseLeave: PropTypes.func
};

Menu.defaultProps = {
    menu: [],
    toggleMenu: () => {},
    onMouseOver: () => {},
    closeMenuByMouseLeave: () => {}
};

export default Menu;
