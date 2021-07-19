class BonusesAirdrop {
    /**
     * @public
     * @method getInitialProps
     * @param context {Object}
     * @returns {Promise}
     */
    getInitialProps() {
        return Promise.resolve();
    }

    /**
     * @public
     * @method normalizeInitialProps
     * @param initialData {Object}
     * @param pageInfo {Object}
     * @returns {Object}
     */
    normalizeInitialProps(initialData, pageInfo) {
        return {
            pageInfo
        };
    }
}

export default BonusesAirdrop;
