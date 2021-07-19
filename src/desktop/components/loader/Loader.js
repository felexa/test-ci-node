/* eslint-disable react/prop-types */

import React from "react";
import classNames from "classnames";

class Loader extends React.Component {
    render() {
        return (
            <span className={classNames("loader-component", this.props.className)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 128 128">
                    <linearGradient id="a">
                        <stop offset="0%" stopColor="#fff" />
                        <stop offset="100%" stopColor="#f74c6b" />
                    </linearGradient>
                    <path
                        d="M63.85 0A63.85 63.85 0 110 63.85 63.85 63.85 0 0163.85 0zm.65 19.5a44 44 0 11-44 44 44 44 0 0144-44z"
                        fill="url(#a)"
                        fillRule="evenodd"
                    />
                </svg>
            </span>
        );
    }
}

export default Loader;
