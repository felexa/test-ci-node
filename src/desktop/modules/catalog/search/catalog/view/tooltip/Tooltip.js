import React from "react";
import PropTypes from "prop-types";
import Resource from "app/core/resource";
import Env from "app/core/environment";

class Tooltip extends React.Component {
    constructor(props) {
        super(props);

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

        this._closeTooltip = this._closeTooltip.bind(this);
        this._closeTooltipWithoutSavingStatusToLS = this._closeTooltipWithoutSavingStatusToLS.bind(this);
    }

    /**
     * @private
     * @method _closeTooltip
     * @returns {void}
     */
    _closeTooltip(e) {
        e.stopPropagation();

        this.props.closeTooltip();
    }

    /**
     * @private
     * @method _closeTooltipWithoutSavingStatusToLS
     * @returns {void}
     */
    _closeTooltipWithoutSavingStatusToLS(e) {
        e.stopPropagation();

        this.props.closeTooltipWithoutSavingStatusToLS();
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="tooltip-catalog bg-white rounded-16 box-shadow-10">
                <div className="tooltip-catalog__header">
                    <div dangerouslySetInnerHTML={{__html: this.HTMLResource.catalog.modal.title}} />
                    <button type="button" className="tooltip-catalog__close" onClick={this._closeTooltipWithoutSavingStatusToLS}>
                        <i className="icon icon-close" />
                    </button>
                </div>
                <div dangerouslySetInnerHTML={{__html: this.HTMLResource.catalog.modal.description}} />

                <a href={this.linksResource.whoAllowed} target="_blank" className="text-decoration-none">
                    { this.HTMLResource.catalog.modal.howWorks }
                </a>

                <button type="button" onClick={this._closeTooltip} className="tooltip-catalog__informed btn-default--outline btn-sm mt-16">
                    {this.stringsResource.informed}
                </button>
            </div>
        );
    }
}

Tooltip.propTypes = {
    closeTooltip: PropTypes.func.isRequired,
    closeTooltipWithoutSavingStatusToLS: PropTypes.func.isRequired
};

export default Tooltip;
