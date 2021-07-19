import React from "react";

import "./styles/main.module.scss";

import View from "./view/Checkout";
import Repository from "./businessLogic/Repository";
import Store from "./businessLogic/store/Store";
import Checkout from "./businessLogic/Checkout";

let checkout = new Checkout({
    dependencies: {
        Repository: new Repository()
    }
});

export default {
    getModule(defaultProps) {
        new Store({ store: defaultProps.store }).run();

        return React.createElement(
            View,
            {
                options: {
                    defaultProps,
                    checkout
                }
            },
            null
        );
    },
    getInitialProps() {
        return this.getServerSideProps();
    },
    getStaticProps() {
        return this.getInitialProps();
    },
    getServerSideProps() {
        return checkout.getInitialProps();
    },
    normalizeInitialProps(data) {
        return checkout.normalizeInitialProps(data);
    }
};
