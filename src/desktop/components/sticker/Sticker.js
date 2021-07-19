import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ModalDialogService from "app/core/services/modalDialog";

class Sticker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            description: {}
        };

        this.modalDialogService = ModalDialogService.getInstance();
        this._selectedSticker = this._selectedSticker.bind(this);
    }

    componentDidMount() {
        this._setStickerDescription();
    }

    /**
     * @method _hasSticker
     * @returns {boolean}
     * @private
     */
    _hasSticker(item) {
        return Boolean(this._getImageUrl(item));
    }

    /**
     * @method _getStickerDescription
     * @returns {Object}
     * @private
     */
    _getStickerDescription() {
        let description = {};

        this.props.items.forEach((item) => {
            description[item.getId()] = item.getDescription();
        });

        return description;
    }

    /**
     * @method _setStickerDescription
     * @returns {void}
     * @private
     */
    _setStickerDescription() {
        this.setState({
            description: this._getStickerDescription()
        });
    }

    /**
     * @method _getImageUrl
     * @returns {string}
     * @private
     */
    _getImageUrl(item) {
        let result = {
            original: item.getImage().getOriginal(),
            medium: item.getImage().getMedium(),
            small: item.getImage().getSmall()
        };

        return result[this.props.type] || "";
    }

    /**
     * @method _selectNotice
     * @returns {Sticker}
     */
    _selectedSticker(e) {
        if (this.props.tooltip) {
            this.modalDialogService.open({
                size: this.modalDialogService.getSizes().getMd(),
                type: this.modalDialogService.getTypes().getInfo(),
                className: "modal-sticker",
                body: this.state.description[e.target.dataset.id],
                html: true
            });
        }

        return this;
    }

    /**
     * @method _renderItems
     * @returns {Array}
     * @private
     */
    _renderItems() {
        return this.props.items.map((item) => (
            this._hasSticker(item) && (
                <div key={item.getId()} className={classNames("sticker__item", {"cursor-pointer": this.props.tooltip})}>
                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                    <img
                        src={`${this._getImageUrl(item)}`}
                        alt={item.getImage().getAlt()}
                        data-id={item.getId()}
                        onClick={this._selectedSticker}
                        title={item.getImage().getAlt()}
                        width="60"
                        height="60"
                    />
                </div>
            )
        ));
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className={`sticker sticker--${this.props.type}`}>
                <div className="sticker__body">
                    <div className={classNames("sticker__items", this.props.className)}>
                        {this._renderItems()}
                    </div>
                </div>
            </div>
        );
    }
}

Sticker.propTypes = {
    items: PropTypes.instanceOf(Array),
    type: PropTypes.string,
    tooltip: PropTypes.bool,
    className: PropTypes.string
};

Sticker.defaultProps = {
    items: [],
    type: "small",
    tooltip: false,
    className: ""
};

export default Sticker;
