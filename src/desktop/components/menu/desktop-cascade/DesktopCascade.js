/* eslint-disable */

import React from "react";
import Menu from "./Menu";

class DesktopCascade extends React.Component {
    constructor(props) {
        super(props);

        this.closeMenu = this.closeMenu.bind(this);
        this.closeMenuByMouseLeave = this.closeMenuByMouseLeave.bind(this);
    }

    componentDidMount() {
        document.head.style.overflow = "initial";
        document.body.style.overflow = "initial";
    }

    closeMenuByMouseLeave(e) {
        if (this.props.eventName === "hover") {
            this.props.toggleMenu(false, "hover");
        }
    }

    closeMenu(e) {
        if (e.target.classList.contains("menu__body")) {
            this.props.toggleMenu();
        }
    }

    render() {
        return (
            <div className="container-fluid d-none d-lg-block position-relative z-index-5">
                <Menu
                    toggleMenu={this.closeMenu}
                    closeMenuByMouseLeave={this.closeMenuByMouseLeave}
                    menu={this.props.menu}
                />
            </div>
        );
    }
}

export default DesktopCascade;
