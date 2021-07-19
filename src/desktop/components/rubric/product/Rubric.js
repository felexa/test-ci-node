import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Title from "components/title/Title";
import ProductCard from "components/product/card/retail/size/xs/Product";

class Rubric extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @protected
     * @method componentDidMount
     * @returns {void}
     */
    componentDidMount() {
        this._setDefaultState();
    }

    /**
     * @private
     * @method _isCollapsed
     * @param rubric {Rubric}
     * @returns {boolean}
     */
    _isCollapsed(rubric) {
        return Boolean(this.state && this.state[rubric.getId()]);
    }

    /**
     * @private
     * @method _getTitleConfig
     * @param rubric {Rubric}
     * @returns {Object}
     */
    _getTitleConfig(rubric) {
        return {
            title: rubric.getName()
        };
    }

    /**
     * @private
     * @method _setDefaultState
     * @returns {Rubric}
     */
    _setDefaultState() {
        let result = {};

        this.props.items.forEach((rubric) => {
            result[rubric.getId()] = rubric.getItems().length > this.props.minRubricItems;
        });

        this.setState(function () {
            return result;
        });

        return this;
    }

    /**
     * @private
     * @method _openRubric
     * @param rubric {Rubric}
     * @returns {Rubric}
     */
    _openRubric(rubric) {
        this.setState(() => ({[rubric.getId()]: false}));

        this.props.open();

        return this;
    }

    /**
     * @method _renderItems
     * @param items {Product[]}
     * @returns {Array}
     */
    _renderItems(items) {
        return items.map((item) => (
            <ProductCard
                key={item.getId()}
                item={item}
                select={this.props.selectItem}
                addToBasket={this.props.addToBasket}
                className="rubric__item bg-white new-super-box-shadow flex-shrink-0"
            />
        ));
    }

    /**
     * @method _renderRubric
     * @param rubric {Rubric}
     * @returns {React.ReactElement}
     */
    _renderRubric(rubric) {
        if (rubric.getItems().length) {
            return (
                <section
                    key={rubric.getId()}
                    className={classNames("rubric rubric--product", {collapsed: this._isCollapsed(rubric)})}
                >
                    <header className="rubric__header">
                        <Title
                            config={this._getTitleConfig(rubric)}
                            notice={this.props.notice}
                            selectNotice={this.props.selectNotice}
                            noGrid
                            iconId={rubric.getIconId()}
                        />
                    </header>

                    <div className="rubric__body">
                        <div className="rubric__items d-flex flex-wrap">
                            {this._renderItems(rubric.getItems())}
                        </div>
                    </div>

                    <footer className="text-center">
                        <button
                            type="button"
                            className="reset-btn-styles btn-md text-pink d-inline-flex align-items-center text-uppercase cursor-pointer"
                            onClick={() => this._openRubric(rubric)}
                        >
                            {this.stringsResource.show.more}
                            <span className="icon icon-arrow-down text-large" />
                        </button>
                    </footer>
                </section>
            );
        }
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        return this.props.items.map((item) => this._renderRubric(item));
    }
}

Rubric.propTypes = {
    minRubricItems: PropTypes.number,
    items: PropTypes.instanceOf(Array),
    notice: PropTypes.instanceOf(Object),
    open: PropTypes.func,
    selectNotice: PropTypes.func,
    selectItem: PropTypes.func,
    addToBasket: PropTypes.func
};

Rubric.defaultProps = {
    minRubricItems: 6,
    items: [],
    notice: null,
    selectNotice() {},
    open() {},
    selectItem() {},
    addToBasket() {}
};

export default Rubric;
