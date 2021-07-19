import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class Item extends React.Component {
    render() {
        let item = this.props.item;

        return (
            <li className="navigation__item">
                <a href={item.getUrl()} className={classNames({active: item.isActive()})}>
                    {item.getIconUrl() && (
                        <div className="navigation__icon">
                            <img
                                src={item.getIconUrl()}
                                alt={item.getTitle()}
                            />
                        </div>
                    )}

                    {item.getIconClassName() && (
                        <div className="navigation__icon">
                            <span className={classNames("icon", item.getIconClassName())} />
                        </div>
                    )}

                    <span className="text-black">{item.getTitle()}</span>
                </a>
            </li>
        );
    }
}

Item.propTypes = {
    item: PropTypes.instanceOf(Object).isRequired
};

export default Item;
