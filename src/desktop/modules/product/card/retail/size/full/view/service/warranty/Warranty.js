import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Warranty extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        this._showWarranty = this._showWarranty.bind(this);
    }

    /**
     * @private
     * @method _getWarrantyDescriptionAsAttribute
     * @returns {string}
     */
    _getWarrantyDescriptionAsAttribute() {
        return `${this.HTMLResource.temperatureMode.title}. ${this.HTMLResource.temperatureMode.description}`;
    }

    /**
     * @property _showWarranty
     * @returns {Warranty}
     * @private
     */
    _showWarranty() {
        this.props.showGuarantee({
            title: this.HTMLResource.temperatureMode.title,
            description: this.HTMLResource.temperatureMode.description
        });

        return this;
    }

    render() {
        return (
            <div className="guarantee line-height-1-5 text-black">
                <p className="mt-0">
                    {this.HTMLResource.warranty.certification}.&nbsp;

                    <a className="text-decoration-none" href={this.Resource.links.warranty} target="_blank">
                        {this.stringsResource.moreDetails}
                    </a>
                </p>

                <p>
                    Хранение лекарственных средств соответствует оптимальному температурному режиму и
                    <span
                        className="color-link hover-color-pink"
                        data-tooltip={this._getWarrantyDescriptionAsAttribute()}
                        onClick={this._showWarranty}
                    >
                        &nbsp;«холодовой цепи»&nbsp;
                    </span>
                    для термолабильных препаратов
                </p>

                <p className="mb-0" dangerouslySetInnerHTML={{__html: this.HTMLResource.warranty.fromSeller}} />
            </div>
        );
    }
}

Warranty.propTypes = {
    showGuarantee: PropTypes.func.isRequired
};

export default Warranty;
