import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Notice from "desktop/components/notice/Notice";
import TitleHeading from "./TitleHeading";

class Title extends React.Component {
    /**
     * @method _hasNotice
     * @returns {boolean}
     * @private
     */
    _hasNotice() {
        return Boolean(this.props.notice);
    }

    /**
     * @method _hasIcon
     * @returns {boolean}
     * @private
     */
    _hasIcon() {
        return Boolean(this.props.iconId);
    }

    /**
     * @method _getNotice
     * @returns {Object}
     */
    _getNotice() {
        return this.props.notice;
    }

    renderTitle() {
        return (
            <div className={classNames("title d-flex justify-content-between align-items-end", this.props.className)}>
                <TitleHeading tag={this.props.tag} className="d-flex align-items-center">
                    {this._hasIcon() && <i className={classNames(`icon icon-${this.props.iconId}`)} />}
                    <span dangerouslySetInnerHTML={{__html: this.props.config.title}} />

                    {this._hasNotice() && (
                        <Notice notice={this._getNotice()} />
                    )}
                </TitleHeading>

                {this.hasShowMoreButton() && (
                    <div className="show-more">
                        <a href={this.props.config.showMore.url} className="text-decoration-none">
                            <span className="d-none d-lg-inline-block">{this.props.config.showMore.title}</span>
                            <span className="d-lg-none text-uppercase">{this.props.config.showMore.shortTitle}</span>
                        </a>
                    </div>
                )}
            </div>
        );
    }

    /**
     * @private
     * @method hasShowMoreButton
     * @returns {boolean}
     */
    hasShowMoreButton() {
        let {showMore} = this.props.config;

        return Boolean(showMore && showMore.title && showMore.url && showMore.shortTitle);
    }

    render() {
        return (
            <>
                {
                    this.props.noGrid && this.renderTitle()
                }

                { !this.props.noGrid && (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                { this.renderTitle() }
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}

Title.propTypes = {
    noGrid: PropTypes.bool,
    tag: PropTypes.string,
    className: PropTypes.string,
    config: PropTypes.shape({
        title: PropTypes.string,
        showMore: PropTypes.shape({
            url: PropTypes.string,
            title: PropTypes.string,
            shortTitle: PropTypes.string
        })
    }).isRequired,
    notice: PropTypes.instanceOf(Object),
    iconId: PropTypes.string
};

Title.defaultProps = {
    tag: "div",
    className: "",
    noGrid: false,
    notice: null,
    iconId: ""
};

export default Title;
