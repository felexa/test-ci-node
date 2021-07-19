import React from "react";
import Env from "app/core/environment";

class LoyaltyPromo extends React.Component {
    constructor(props) {
        super(props);
        this.env = Env.getInstance();
    }

    render() {
        return (
            <a
                href="/morkovki"
                className="loyalty-promo d-flex align-items-center rounded-16"
            >
                <span className="loyalty-promo__icon d-flex">
                    <img
                        src={`${this.env.getMainImageRepository()}/landings/morkovki/white-carrot.svg`}
                        alt="icon"
                    />
                </span>

                <p className="loyalty-promo__title">
                    Морковки
                </p>

                <span className="shield rounded-10">Beta</span>

                <i className="icon icon-arrow-right" />
            </a>
        );
    }
}

export default LoyaltyPromo;
