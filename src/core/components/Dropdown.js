import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

function Dropdown(props) {
    let {className, items, isShow} = props;

    return isShow ? (
        <div className={classnames("dropdown", className)}>
            <ul className="dropdown__items">
                {items.map((item, index) => (
                    <li className="items__item" key={index}>
                        <a href={item.href || "#"}>{item.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        ""
    );
}

Dropdown.defaultProps = {
    className: "",
    items: [],
    isShow: false
};

Dropdown.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            href: PropTypes.string
        })
    ),
    isShow: PropTypes.bool
};

export default Dropdown;
