import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Env from "app/core/environment";
import LanguageEnum from "app/core/utilites/enum/language";
import categoryColorEnum from "app/core/utilites/enum/blog/category/color";
// import categoryImageEnum from "app/core/utilites/enum/blog/category/image";
import Resource from "app/core/resource";

class Categories extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property currentLanguage
         * @type {String}
         */
        this.currentLanguage = Env.getInstance().getLanguage();

        /**
         * @property languageEnum
         * @type {Enum}
         */
        this.languageEnum = LanguageEnum.getInstance();

        this.categoryColorEnum = categoryColorEnum.getInstance();
        // this.categoryImageEnum = categoryImageEnum.getInstance();

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {
            isOpen: false,
            buttonName: this.stringsResource.show.all
        };

        /**
         * @property items
         * @type {Array}
         */
        this.items = props.items;

        this._showAllCategories = this._showAllCategories.bind(this);
    }

    /**
     * @private
     * @method _isUaLocale
     * @returns {boolean}
     */
    _isUaLocale() {
        return this.languageEnum.isUa(this.currentLanguage);
    }

    /**
     * @private
     * @method _getStyle
     * @param item {Category}
     * @returns {Object}
     */
    _getStyle(item) {
        return {
            backgroundColor: `${this.categoryColorEnum.getValueByKey(item.getAlias())}`
            // backgroundImage: `url(${this.categoryImageEnum.getValueByKey(item.getAlias())})`
        };
    }

    /**
     * @private
     * @method _getPathToCategory
     * @returns {string}
     */
    _getPathToCategory(item) {
        return this.props.buildUrlForCategory(item.getAlias());
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this.items.map((item) => (
            <div
                className="categories__item"
                key={item.getName()}
            >
                <a
                    href={this._getPathToCategory(item)}
                    className="f-weight-5 rounded-16 d-flex align-items-center position-relative text-decoration-none"
                    style={this._getStyle(item)}
                >
                    {item.getName()}
                </a>
            </div>
        ));
    }

    /**
     * @private
     * @method _showAllCategories
     * @returns {Categories}
     */
    _showAllCategories() {
        this.setState((prevState) => {
            let isOpen = prevState.isOpen;

            return {
                buttonName: !isOpen ? this.stringsResource.show.less : this.stringsResource.show.all,
                isOpen: !isOpen
            };
        });

        return this;
    }

    /**
     * @method _getCurrentButtonName
     * @return {string}
     */
    _getCurrentButtonName() {
        return this.state.buttonName;
    }

    /**
     * @private
     * @method _isCollapsible
     * @return {boolean}
     */
    _isCollapsible() {
        return Boolean(this.items.length > 4);
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="categories">
                <header className="categories__header blog-section__header">
                    <h2 className="categories__title f-weight-5">
                        {this.stringsResource.categories}
                    </h2>
                </header>

                <div className={classnames("categories__body", {collapsed: !this.state.isOpen})}>
                    <div className="categories__items d-flex flex-wrap">
                        {this._renderItems()}
                    </div>
                </div>

                {this._isCollapsible() && (
                    <div className="categories__footer d-md-none text-center">
                        <a
                            className="text-decoration-none categories__show-all"
                            onClick={this._showAllCategories}
                        >
                            {this._getCurrentButtonName()}
                        </a>
                    </div>
                )}
            </section>
        );
    }
}

Categories.propTypes = {
    items: PropTypes.instanceOf(Array).isRequired,
    buildUrlForCategory: PropTypes.func.isRequired
};

export default Categories;
