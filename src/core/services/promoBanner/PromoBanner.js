class PromoBanner {
    constructor(props) {
        this.Repository = props.dependencies.Repository;

        this.BannerEntity = props.dependencies.BannerEntity;
    }

    /**
     * @public
     * @method getPromoBanner
     // * @param success {Function}
     * @returns {Object}
     */
    getPromoBanner(/*success*/) {
        // this.Repository.getBanner((banner) => {
        //     success(banner);
        // });
        //
        // return this;

        let randomBannerNumber = Math.floor(Math.random() * this.Repository.getPromoBanner().length);

        return this.Repository.getPromoBanner()[randomBannerNumber];
    }

    /**
     * @public
     * @method convertPromoBannerToEntity
     * @param banner {Object}
     * @returns {PromoBanner}
     */
    convertPromoBannerToEntity(banner) {
        return new this.BannerEntity(banner);
    }
}

export default PromoBanner;
