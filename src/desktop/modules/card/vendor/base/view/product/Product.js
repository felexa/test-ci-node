import React from "react";
import PropTypes from "prop-types";

class Product extends React.Component {
    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (

            <section className="vendor-card__section">
                <div className="product rounded-16 color-white d-md-flex align-items-center">
                    <div className="product__preview col-md-6">
                        <img
                            src={this.props.mainProduct.getPreview().getLarge()}
                            alt={this.props.mainProduct.getPreview().getAlt()}
                            title={this.props.mainProduct.getPreview().getTitle()}
                        />
                    </div>

                    <div className="product__company col-md-6">
                        <header className="product__header">
                            <h2 className="product__title f-weight-5 color-white">{this.props.mainProduct.getName()}</h2>
                        </header>

                        <div className="product__body">
                            <p
                                className="product__description"
                                dangerouslySetInnerHTML={{__html: this.props.mainProduct.getDescriptionAsHTML()}}
                            />

                            <a href={this.props.mainProduct.getUrl()} className="btn-default btn-md text-uppercase">
                                Купить
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
