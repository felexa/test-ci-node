/* eslint-disable max-len */
import React from "react";

import Resource from "app/core/resource";
import ModalDialogService from "app/core/services/modalDialog";
import Env from "app/core/environment";

import Image from "components/image/Image";

class BonusAlert extends React.Component {
    constructor(props) {
        super(props);

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

        /**
         * @property modalDialogService
         * @type {ModalDialog}
         */
        this.modalDialogService = ModalDialogService.getInstance();

        /**
         * @property resource
         * @type {Object}
         */
        this.Resource = Resource;

        this._showRules = this._showRules.bind(this);
    }

    /**
     * @private
     * @method _showRules
     * @returns {BonusAlert}
     */
    _showRules() {
        this.modalDialogService.open({
            body: this.HTMLResource.rulesReceivingBonusByReviews,
            title: this.stringsResource.bonusesByReviews,
            size: this.modalDialogService.getSizes().getSm(),
            type: this.modalDialogService.getTypes().getInfo(),
            html: true
        });

        return this;
    }

    render() {
        return (
            <section className="review__bonus-alert d-flex align-items-center rounded-10 mb-24">
                <div className="d-flex align-items-center text-black mr-8">
                    <Image
                        src={this.Resource.links.images.yellowCarrot}
                        alt="bonus icon"
                        width={40}
                        height={40}
                    />
                    <span dangerouslySetInnerHTML={{__html: this.HTMLResource.bonusByReview}} />
                </div>
                <i className="icon icon-info" onClick={this._showRules} />
            </section>
        );
    }
}

export default BonusAlert;
