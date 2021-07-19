import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Notice from "desktop/components/notice/Notice";

class Certificates extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
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
     * @method _hasCertificates
     * @returns {boolean}
     */
    _hasCertificates() {
        return Boolean(this._getCertificates().length);
    }

    /**
     * @private
     * @method _getCertificates
     * @returns {Array}
     */
    _getCertificates() {
        return this.props.items.filter((file) => file.getType() === "certificate");
    }

    /**
     * @method _renderNotice
     * @returns {boolean|string}
     * @private
     */
    _renderNotice() {
        return this._hasNotice() && (
            <Notice notice={this.props.notice} />
        );
    }

    /**
     * @private
     * @method renderCertificates
     * @returns {string[]}
     */
    renderCertificates() {
        return this._getCertificates().map((item, index) => (
            <div key={index} className="certificate__item d-flex align-items-center">
                <a
                    key={index}
                    className="d-inline-flex align-items-center text-decoration-none"
                    target="_blank"
                    rel="noreferrer"
                    href={item.getUrl()}
                    onClick={this.props.downloadCertificate}
                    download
                >
                    <i className="icon icon-download" /> {this.stringsResource.certificate}
                </a>

                {this._renderNotice()}
            </div>
        ));
    }

    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        return this._hasCertificates() && (
            <div className="certificate mt-16">
                <div className="certificate__items">
                    {this.renderCertificates()}
                </div>
            </div>
        );
    }
}

Certificates.propTypes = {
    items: PropTypes.instanceOf(Array).isRequired,
    downloadCertificate: PropTypes.func.isRequired,
    notice: PropTypes.instanceOf(Object)
};

Certificates.defaultProps = {
    notice: null
};

export default Certificates;
