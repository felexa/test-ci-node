import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

// eslint-disable-next-line import/no-named-as-default
import ThreadItem from "components/reviewThread/base/ThreadItem";

class Threads extends React.Component {
    /**
     * @method _getItems
     * @returns {Array}
     */
    _getItems() {
        return this.props.items;
    }

    /**
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this._getItems().map((item) => (
            <ThreadItem
                key={item.getId()}
                hideAnswers={this.props.hideAnswers}
                item={item}
                toAnswer={this.props.toAnswer}
                getAllAnswers={this.props.getAllAnswers}
                toVote={this.props.toVote}
                productName={this.props.productName}
                maxCommentLength={this.props.maxCommentLength}
                showCollapsedBtn={this.props.showCollapsedBtn}
            />
        ));
    }

    /**
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className={classnames("threads", this.props.className)}>
                {this._renderItems()}
            </div>
        );
    }
}

Threads.propTypes = {
    className: PropTypes.string,
    hideAnswers: PropTypes.bool,
    items: PropTypes.instanceOf(Array),
    toAnswer: PropTypes.func,
    getAllAnswers: PropTypes.func,
    toVote: PropTypes.func,
    productName: PropTypes.string,
    maxCommentLength: PropTypes.number,
    showCollapsedBtn: PropTypes.bool
};

Threads.defaultProps = {
    className: "",
    hideAnswers: false,
    items: [],
    toAnswer() {},
    getAllAnswers() {},
    toVote() {},
    productName: "",
    maxCommentLength: Infinity,
    showCollapsedBtn: false
};

export default Threads;
