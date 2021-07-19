import React from "react";
import PropTypes from "prop-types";

import ModalDialogService from "app/core/services/modalDialog";

class Notice extends React.Component {
    constructor(props) {
        super(props);

        this.modalDialogService = ModalDialogService.getInstance();
    }

    /**
     * @method _getNoticeForAttribute
     * @returns {string}
     * @private
     */
    _getNoticeForAttribute() {
        return `${this.props.notice.getTitle()} ${this.props.notice.getDescription()}`;
    }

    /**
     * @method _buildNoticeId
     * @returns {string}
     * @private
     */
    _buildNoticeId() {
        return `#fn:${this.props.notice.getPosition()}`;
    }

    /**
     * @method _selectNotice
     * @returns {Notice}
     */
    _selectNotice() {
        this.modalDialogService.open({
            size: this.modalDialogService.getSizes().getMd(),
            type: this.modalDialogService.getTypes().getInfo(),
            className: "notice",
            title: this.props.notice.getTitle(),
            body: this.props.notice.getDescription(),
            html: true
        });

        return this;
    }

    render() {
        return (
            <div className="notice d-inline-block">
                <span
                    className="badge cursor-pointer d-print-none"
                    data-notice={this._getNoticeForAttribute()}
                    onClick={() => this._selectNotice()}
                >
                    {this.props.notice.getPosition()}
                </span>

                <a
                    href={this._buildNoticeId()}
                    className="badge d-none d-print-inline"
                    rel="footnote"
                >
                    {this.props.notice.getPosition()}
                </a>
            </div>
        );
    }
}

Notice.propTypes = {
    notice: PropTypes.instanceOf(Object).isRequired
};

export default Notice;
