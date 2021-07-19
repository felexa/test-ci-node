import React from "react";
import PropTypes from 'prop-types';

import { Link } from "config/routes";

import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Aside extends React.Component {
    constructor(props) {
        super(props);

        this.items = this.props.items;

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        this._onChangePage = this._onChangePage.bind(this);
    }

    /**
     * @private
     * @method _isActivePage
     * @param id {string}
     * @returns {boolean}
     */
    _isActivePage(id) {
        return this.props.currentPage === id;
    }

    /**
     * @private
     * @method _hasSubItems
     * @param item {Object}
     * @returns Boolean
     */
    _hasSubItems(item) {
        return Boolean(item.subItems && item.subItems.length);
    }

    /**
     * @private
     * @method _onChangePage
     * @param url {string}
     * @returns {Function}
     */
    _onChangePage(url) {
        return (event) => {
            event.preventDefault();
            this.props.selectItem(url);
        };
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this.items.map((item) => (
            <li
                className="navigation__item"
                key={item.title}
            >
                <Link
                    href={`${item.url}/`}
                    passHref
                    prefetch={false}
                >
                    <a
                        className={classNames({active: this._isActivePage(item.id)})}
                        onClick={this._onChangePage(item.url)}
                    >
                        { item.title }
                    </a>
                </Link>

                {this._isActivePage(item.id) && this._hasSubItems(item) && (
                    <ul className="navigation__subitems">
                        <li className="subitems__item">
                            <a href="#pharmacy-courier">
                                {this.HTMLResource.about.delivery.courier} {this.HTMLResource.about.delivery.a24.name}
                            </a>
                        </li>

                        <li className="subitems__item">
                            <a href="#ukr-post">
                                {this.HTMLResource.about.delivery.ukrPost.name}
                                <br />
                                {this.HTMLResource.about.delivery.courierAndDepartments}
                            </a>
                        </li>

                        <li className="subitems__item">
                            <a href="#new-post">
                                {this.HTMLResource.about.delivery.newPost.name}
                                <br />
                                {this.HTMLResource.about.delivery.courierAndDepartments}
                            </a>
                        </li>

                        {/* <li className="subitems__item">
                            <a href="#justin">
                                «Justin» <br />
                                (курьеры и отделения)
                            </a>
                        </li>

                        <li className="subitems__item">
                            <a href="#meest">
                                «Meest» <br />
                                (курьеры и отделения)
                            </a>
                        </li> */}

                        <li className="subitems__item">
                            <a href="#self-delivery">
                                {this.HTMLResource.about.delivery.selfDelivery.title}
                            </a>
                        </li>

                        <li className="subitems__item">
                            <a href="#payment-return">
                                {this.HTMLResource.about.delivery.paymentReturn.title}
                            </a>
                        </li>
                    </ul>
                )}
            </li>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <aside className="about-us__aside aside">
                <nav className="aside__navigation navigation">
                    <ul className="navigation__items">
                        { this._renderItems() }
                    </ul>
                </nav>
            </aside>
        );
    }
}

Aside.propTypes = {
    items: PropTypes.instanceOf(Array).isRequired,
    currentPage: PropTypes.string,
    selectItem: PropTypes.func
};

Aside.defaultProps = {
    currentPage: "",
    selectItem: () => {}
};

export default Aside;
