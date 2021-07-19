/* eslint-disable react/prop-types */
import React from "react";

class LinkItem extends React.Component {
    render() {
        return (
            <a href={this.props.url} className="hot-link d-flex align-items-center w-100">
                <span className="hot-link-image">
                    <i className={`icon ${this.props.iconName}`} />
                </span>

                <span className="d-inline-flex align-items-center justify-content-between flex-grow-1">
                    <span className="text-black hot-link-title">{this.props.title}</span>
                    <i className="icon icon-chevron-right" />
                </span>
            </a>
        );
    }
}

export default LinkItem;
