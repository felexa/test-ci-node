/* eslint-disable no-underscore-dangle */
class AdmitAd {
    constructor(props) {
        this.eventIdentifiers = props.eventIdentifiers;
    }

    /**
     * @public
     * @method sendHomePageEvent
     * @returns {void}
     */
    sendHomePageEvent() {
        window._retag = window._retag || [];

        if (!window._retag.includes(this.eventIdentifiers.home)) {
            window._retag.push(this.eventIdentifiers.home);
        }
    }

    /**
     * @public
     * @method sendProductPageEvent
     * @param product {Object}
     * @returns {void}
     */
    sendProductPageEvent(product) {
        window._retag = window._retag || [];

        window.ad_product = {
            id: product.getCode(),
            vendor: product.getBrand().getName(),
            price: product.getPrice().getCurrent(),
            url: product.getUrl(),
            picture: product.getPreview().getMedium(),
            name: product.getName(),
            category: product.getCategory().getName()
        };

        if (!window._retag.includes(this.eventIdentifiers.product)) {
            window._retag.push(this.eventIdentifiers.product);
        }
    }

    /**
     * @public
     * @method sendBasketEvent
     * @param basket {Object}
     * @returns {void}
     */
    sendBasketEvent(basket) {
        window._retag = window._retag || [];
        window.ad_products = [];

        basket.getItems().forEach(function (item) {
            window.ad_products.push({
                id: item.getPosition().getCode(),
                number: item.getQuantity()
            });
        });

        if (!window._retag.includes(this.eventIdentifiers.basket)) {
            window._retag.push(this.eventIdentifiers.basket);
        }
    }
}

export default AdmitAd;
