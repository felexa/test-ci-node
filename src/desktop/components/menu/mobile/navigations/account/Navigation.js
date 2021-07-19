import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Resource from "app/core/resource";
import Env from "app/core/environment";

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @method _renderItem
     * @param item {Object}
     * @return {React.Element}
     */
    _renderItem(item) {
        return (
            <div className="navigation__item" onClick={() => this.props.toNext(item)} key={item.getId()}>
                <div className="d-flex align-items-center justify-content-between w-100">
                    <div className="d-flex justify-content-between f-weight-4 w-100">
                        <div className="d-flex align-items-center">
                            {item.getIconUrl() && (
                                <img
                                    className="item__icon"
                                    src={item.getIconUrl()}
                                    alt={item.getTitle()}
                                />
                            )}

                            {item.getIconClassName() && (
                                <span className={classNames("item__icon icon", item.getIconClassName())} />
                            )}

                            {!item.getItems().length && (
                                <a className="flex-grow-1 d-flex" href={item.getUrl()}>
                                    {item.getTitle()}
                                </a>
                            )}

                            {Boolean(item.getItems().length) && item.getTitle()}
                        </div>

                        {Boolean(item.getCount()) && (
                            <div className="">
                                <span className="badge align-self-start">
                                    {item.getCount()}
                                </span>
                            </div>
                        )}
                    </div>

                    {Boolean(item.getItems().length) && (
                        <i className="icon icon-chevron-right" />
                    )}
                </div>
            </div>
        );
    }

    /**
     * @method _renderItems
     * @return {Array}
     */
    _renderItems() {
        return this.props.items.map((item) => this._renderItem(item));
    }

    render() {
        return (
            <div className="mobile-menu__navigation d-flex flex-column h-100">
                <div onClick={this.props.toBack} className="navigation__header d-flex align-items-center">
                    <button type="button" className="d-inline-flex justify-content-end align-items-center">
                        <i className="icon icon-arrow-left" />
                    </button>

                    <span>{this.props.title}</span>
                </div>

                <div className="navigation__body">
                    <div className="navigation__items">
                        {this._renderItems()}

                        <div className="navigation__item" onClick={this.props.toLogout}>
                            <div className="d-flex align-items-center justify-content-between w-100">
                                <div className="d-flex align-items-center f-weight-4 w-100">
                                    <span className="item__icon icon icon-sign-out" />

                                    {this.stringsResource.exit}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Navigation.propTypes = {
    toBack: PropTypes.func.isRequired,
    toNext: PropTypes.func.isRequired,
    toLogout: PropTypes.func.isRequired,
    title: PropTypes.string,
    items: PropTypes.instanceOf(Array)
};

Navigation.defaultProps = {
    title: "",
    items: []
};

export default Navigation;
