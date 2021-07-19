import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Product extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section className="vendor-card__section">
                <div className="product vendor-card__section rounded-16 color-white d-md-flex align-items-center new-super-box-shadow">
                    <div className="col-md-6">
                        <div className="product__preview">
                            <img
                                src={this.props.mainProduct.getPreview().getLarge()}
                                alt={this.props.mainProduct.getPreview().getAlt()}
                                title={this.props.mainProduct.getPreview().getTitle()}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="product__header">
                            <div className="product__title f-weight-5 color-white">
                                {this.props.mainProduct.getName()}
                            </div>
                        </div>

                        <div className="product__body">
                            <p
                                className="product__description"
                                dangerouslySetInnerHTML={{__html: this.props.mainProduct.getDescriptionAsHTML()}}
                            />
                        </div>

                        <div className="product__footer">
                            <a
                                href={this.props.mainProduct.getUrl()}
                                className="btn-default btn-md"
                            >
                                {this.stringsResource.moreDetails}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Product.propTypes = {
    mainProduct: PropTypes.instanceOf(Object).isRequired
};

export default Product;
