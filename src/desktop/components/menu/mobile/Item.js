/* eslint-disable react/prop-types */

import React from "react";
import ClassNames from "classnames";

class Item extends React.Component {
    render() {
        return (
            <div className={ClassNames("menu-item d-flex", this.props.className)}>
                <a href={this.props.item.url} className="menu-item__body d-flex align-items-center flex-grow-1">
                    {this.props.item.icon && (
                        <>
                            <i className={ClassNames("icon", this.props.item.icon)} />{this.props.item.title}
                        </>
                    )}
                    {this.props.item.iconUrl && (
                        <>
                            <img src={this.props.item.iconUrl} className="menu-item__icon icon" alt="icon carrot" />
                            {this.props.item.title}

                            {/*<span className="shield rounded-10">Beta</span>*/}
                        </>
                    ) }
                </a>

                { this.props.children }
            </div>
        );
    }
}

export default Item;
