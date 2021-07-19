import React from "react";

import Resource from "app/core/resource";
import Env from "app/core/environment";
import ModalDialogService from "app/core/services/modalDialog";
import LocalStorage from "app/core/utilites/storage/localStorage";
import LocalStorageEnum from "app/core/utilites/enum/localStorageName";
import FacetAttributeEnum from "app/core/utilites/enum/facetAttribute";

import DeviceDesktop from "components/deviceDetector/desktop/Detector";
import DeviceMobile from "components/deviceDetector/mobile/Detector";
import PanelBase from "components/accordion/panel/Panel";

import Tooltip from "desktop/modules/catalog/search/catalog/view/tooltip/Tooltip";

class Panel extends PanelBase {
    constructor(props) {
        super(props);

        /**
         * @property ref
         * @type {Object}
         */
        this.ref = {
            informer: React.createRef()
        };

        /**
         * @property state
         * @type {Object}
         */
        this.state = {
            isShowTooltip: false
        };

        /**
         * @property stringsResource
         * @type {Resource}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property HTMLResource
         * @type {Resource}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        /**
         * @property linksResource
         * @type {Resource}
         */
        this.linksResource = Resource.links;

        /**
         * @property modalDialogService
         * @type {ModalDialog}
         */
        this.modalDialogService = ModalDialogService.getInstance();
        this.LocalStorage = LocalStorage.getInstance();
        this.LocalStorageEnum = LocalStorageEnum.getInstance();
        this.FacetAttributeEnum = FacetAttributeEnum.getInstance();

        this._handleClickDesktop = this._handleClickDesktop.bind(this);
        this._handleClickMobile = this._handleClickMobile.bind(this);
        this.closeTooltip = this.closeTooltip.bind(this);
        this._closeModal = this._closeModal.bind(this);
        this.closeTooltipWithoutSavingStatusToLS = this.closeTooltipWithoutSavingStatusToLS.bind(this);
    }

    componentDidMount() {
        if (this.props.htmlDataAttribute.value === this.FacetAttributeEnum.getKomuMozhnoAsValue()) {
            this._changeStatusDisplayingTooltip();
        }
    }

    /**
     * @private
     * @method _isShowTooltip
     * @returns {boolean}
     */
    _isShowTooltip() {
        // eslint-disable-next-line max-len
        return this.props.htmlDataAttribute.value === this.FacetAttributeEnum.getKomuMozhnoAsValue() && this.state.isShowTooltip;
    }

    /**
     * @private
     * @method _buildHtmlDataAttribute
     * @returns {Object}
     */
    _buildHtmlDataAttribute() {
        return {[`data-${this.props.htmlDataAttribute.attribute}`]: this.props.htmlDataAttribute.value};
    }

    /**
     * @private
     * @method _changeStatusDisplayingTooltip
     * @returns {void}
     */
    _changeStatusDisplayingTooltip() {
        if (this._getHintStatus()) {
            this._toogleTooltip(false);
        } else {
            this._toogleTooltip(true);
        }
    }

    /**
     * @method _getHintStatus
     * @return {string}
     * @private
     */
    _getHintStatus() {
        return this.LocalStorage.getItem(this.LocalStorageEnum.getCloseInformerInFacetFilterInCatalogAsValue());
    }

    /**
     * @private
     * @method _handleClickMobile
     * @param e {Object}
     * @returns {Panel}
     */
    _handleClickMobile(e) {
        if (e.target !== this.ref.informer.current) {
            this.props.selectItem();
        } else {
            this._openModal();
        }

        return this;
    }

    /**
     * @private
     * @method _openModal
     * @returns {void}
     */
    _openModal() {
        this.modalDialogService.open({
            size: this.modalDialogService.getSizes().getMd(),
            type: this.modalDialogService.getTypes().getInfo(),
            className: "modal-informer",
            body: this._renderModalBody()
        });
    }

    /**
     * @private
     * @method _closeModal
     * @returns {void}
     */
    _closeModal() {
        this.modalDialogService.close();
    }

    /**
     * @method _setHintStatus
     * @param name {string}
     * @param value {boolean}
     * @return {Panel}
     * @private
     */
    _setHintStatus(value) {
        this.LocalStorage.setItem(this.LocalStorageEnum.getCloseInformerInFacetFilterInCatalogAsValue(), value);

        return this;
    }

    /**
     * @private
     * @method _toogleTooltip
     * @param state {boolean}
     * @returns {void}
     */
    _toogleTooltip(state) {
        this.setState({
            isShowTooltip: state
        });
    }

    /**
     * @private
     * @method _handleClickDesktop
     * @param e {Object}
     * @returns {Panel}
     */
    _handleClickDesktop(e) {
        if (e.target !== this.ref.informer.current) {
            this.props.selectItem();
        } else {
            this._toogleTooltip(true);
        }

        return this;
    }

    _renderModalBody() {
        return (
            <div>
                <div dangerouslySetInnerHTML={{ __html: this.HTMLResource.catalog.modal.title}} />
                <div dangerouslySetInnerHTML={{ __html: this.HTMLResource.catalog.modal.description}} />
                <a href={this.linksResource.whoAllowed} target="_blank" className="text-decoration-none">
                    { this.HTMLResource.catalog.modal.howWorks }
                </a>
                <br />
                <button type="button" onClick={this._closeModal} className="informed btn-default--outline btn-sm mt-16">
                    {this.stringsResource.informed}
                </button>
            </div>
        );
    }

    /**
     * @public
     * @method closeTooltip
     * @returns {void}
     */
    closeTooltip() {
        this._setHintStatus(true);
        this._toogleTooltip(false);
    }

    /**
     * @public
     * @method closeTooltipWithoutSavingStatusToLS
     * @returns {void}
     */
    closeTooltipWithoutSavingStatusToLS() {
        this._toogleTooltip(false);
    }

    render() {
        let { children, title, microDataAttrs } = this.props;

        return (
            <section className={this._buildPanelClasses()} {...microDataAttrs} {...this._buildHtmlDataAttribute()}>

                <DeviceDesktop>
                    <header className="panel__header" onClick={this._handleClickDesktop}>
                        <div className="panel__title d-flex align-items-center">
                            <span className="mr-8" dangerouslySetInnerHTML={{__html: title}} />
                            <i ref={this.ref.informer} className="icon icon-info" />
                        </div>
                        <i className={this._buildIconClasses()} />
                        {this._isShowTooltip() && (
                            <Tooltip
                                closeTooltip={this.closeTooltip}
                                closeTooltipWithoutSavingStatusToLS={this.closeTooltipWithoutSavingStatusToLS}
                            />
                        )}
                    </header>

                </DeviceDesktop>

                <DeviceMobile>
                    <header className="panel__header" onClick={this._handleClickMobile}>
                        <div className="panel__title d-flex align-items-center">
                            <span className="mr-8" dangerouslySetInnerHTML={{__html: title}} />
                            <i ref={this.ref.informer} className="icon icon-info" />
                        </div>
                        <i className={this._buildIconClasses()} />
                    </header>
                </DeviceMobile>

                {this.isHtmlBody() && (
                    <div
                        className="panel__body"
                        dangerouslySetInnerHTML={{
                            __html: children
                        }}
                    />
                )}

                {!this.isHtmlBody() && <div className="panel__body">{children}</div>}
            </section>
        );
    }
}

export default Panel;
