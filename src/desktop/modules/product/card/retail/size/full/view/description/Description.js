import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Notice from "desktop/components/notice/Notice";

class Description extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property maximumContentLength
         * @type {number}
         */
        this.maximumContentLength = 3500;

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {
            isCollapsible: props.html.length > this.maximumContentLength,
            isOpen: false,
            description: props.html,
            buttonName: props.buttonShowMoreName
        };

        this._toggleDescription = this._toggleDescription.bind(this);
    }

    /**
     * @private
     * @method _hasTitle
     * @returns {boolean}
     */
    _hasTitle() {
        return Boolean(this.getTitle());
    }

    /**
     * @method _hasNotice
     * @returns {boolean}
     * @private
     */
    _hasNotice() {
        return Boolean(this.props.notice);
    }

    /**
     * @private
     * @method _isCollapsed
     * @return {boolean}
     */
    _isCollapsed() {
        return this._isCollapsible() && !this._isOpen();
    }

    /**
     * @private
     * @method _isCollapsible
     * @return {boolean}
     */
    _isCollapsible() {
        return this.state.isCollapsible;
    }

    /**
     * @private
     * @method _isOpen
     * @return {boolean}
     */
    _isOpen() {
        return this.state.isOpen;
    }

    /**
     * @private
     * @method _toggleDescription
     * @returns {Description}
     */
    _toggleDescription() {
        this.setState((prevState) => {
            let isOpen = prevState.isOpen;

            if (!isOpen) {
                this.props.open();
            }

            return {
                buttonName: !isOpen ? this.stringsResource.show.less : this.props.buttonShowMoreName,
                isOpen: !isOpen
            };
        });

        return this;
    }

    /**
     * @private
     * @method getTitle
     * @return {String}
     */
    getTitle() {
        return this.props.title;
    }

    /**
     * @private
     * @method getCurrentDescription
     * @return {string}
     */
    getCurrentDescription() {
        return this.state.description;
    }

    /**
     * @method getCurrentButtonName
     * @return {string}
     */
    getCurrentButtonName() {
        return this.state.buttonName;
    }

    /**
     * @method _getNotice
     * @returns {Object}
     */
    _getNotice() {
        return this.props.notice;
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <section className="description adaptive-content d-flex flex-column h-100">
                {this._hasTitle() && (
                    <div className="adaptive-content__header description__header">
                        <h2
                            className="text-black adaptive-content__title"
                        >
                            <span dangerouslySetInnerHTML={{__html: this.props.title}} />

                            {this._hasNotice() && (
                                <Notice notice={this._getNotice()} />
                            )}
                        </h2>
                    </div>
                )}

                <div
                    className={classnames("description__body", "flex-grow-1", {collapsed: this._isCollapsed()})}
                    dangerouslySetInnerHTML={{__html: this.getCurrentDescription()}}
                />

                {this._isCollapsible() && (
                    <div className="description__footer adaptive-content__footer">
                        <a onClick={this._toggleDescription} className="text-medium text-decoration-none">
                            {this.getCurrentButtonName()}
                        </a>
                    </div>
                )}
            </section>
        );
    }
}

Description.propTypes = {
    buttonShowMoreName: PropTypes.string,
    title: PropTypes.string,
    html: PropTypes.string,
    notice: PropTypes.instanceOf(Object),
    open: PropTypes.func
};

Description.defaultProps = {
    buttonShowMoreName: "смотреть всё описание",
    title: "",
    html: "",
    notice: null,
    open() {}
};

export default Description;
