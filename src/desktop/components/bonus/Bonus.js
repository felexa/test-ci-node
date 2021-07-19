import React from "react";
import PropTypes from "prop-types";

import Resource from "app/core/resource";
import Env from "app/core/environment";
import ModalDialogService from "app/core/services/modalDialog";

import Image from "components/image/Image";

class Bonus extends React.Component {
    constructor(props) {
        super(props);
        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        this.modalDialogService = ModalDialogService.getInstance();
        this._showDescription = this._showDescription.bind(this);
    }

    /**
     * @method _showDescription
     * @returns {Bonus}
     */
    _showDescription() {
        this.modalDialogService.open({
            size: this.modalDialogService.getSizes().getMd(),
            type: this.modalDialogService.getTypes().getInfo(),
            title: this.HTMLResource.bonus.modal.title,
            className: "modal-bonus",
            body: this.HTMLResource.bonus.modal.description,
            html: true
        });

        return this;
    }

    render() {
        return (
            <div className="bonus-cashback d-flex align-items-center">
                <Image
                    src={this.Resource.links.images.yellowCarrotMini}
                    alt="carrot"
                    width={24}
                    height={24}
                />
                <span className="mr-6">{this.stringsResource.cashback}</span>
                <span className="bonus-cashback__amount color-orange f-weight-7" title={this.stringsResource.returnToBonusAccount} onClick={this._showDescription}>{this.props.bonus.getValue()} ₴</span>
            </div>
        );
    }
}

Bonus.propTypes = {
    bonus: PropTypes.instanceOf(Object).isRequired
};

export default Bonus;
