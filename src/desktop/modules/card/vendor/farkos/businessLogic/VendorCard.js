class VendorCard {
    constructor(props) {
        this.CompanyEntity = props.dependencies.CompanyEntity;
        this.BannerEntity = props.dependencies.BannerEntity;
        this.NoteEntity = props.dependencies.NoteEntity;
        this.ProductEntity = props.dependencies.ProductEntity;
        this.PageInfoEntity = props.dependencies.PageInfoEntity;

        this.Repository = props.dependencies.Repository;
        // this.RubricService = props.dependencies.RubricService;
        // this.BasketService = props.dependencies.BasketService;
    }

    /**
     * @private
     * @method _getCompany
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getCompany(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getCompany((company) => {
                resultContainer.company = company;

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getCompany
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getBanner(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getBanner((banner) => {
                resultContainer.banner = banner;

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getVendorAdvantages
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getVendorAdvantages(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getVendorAdvantages((advantage) => {
                resultContainer.vendorAdvantages = advantage;

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getMainProduct
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getMainProduct(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getMainProduct((product) => {
                resultContainer.mainProduct = product;

                resolve();
            }, resolve);
        });
    }

    /**
     * @private
     * @method _getProductAdvantages
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getProductAdvantages(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getProductAdvantages((advantage) => {
                resultContainer.productAdvantages = advantage;

                resolve();
            }, resolve);
        });
    }

    /**
     * @public
     * @method getInitialProps
     * @return {Promise}
     */
    getInitialProps(context) {
        let result = {
            company: {},
            banner: {},
            vendorAdvantages: [],
            mainProduct: {},
            productAdvantages: []
        };

        return Promise.all([
            this._getCompany(result),
            this._getBanner(result),
            this._getVendorAdvantages(result),
            this._getMainProduct(result),
            this._getProductAdvantages(result)
        ])
            .then(() => new Promise((resolve) => {
                result.vendorId = context.query.vendorId;
                resolve();
            }))
            .then(() => result)
            .catch(() => result);
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
            company: new this.CompanyEntity(initialData.company),
            banner: new this.BannerEntity(initialData.banner),
            vendorAdvantages: (initialData.vendorAdvantages || []).map((item) => new this.NoteEntity(item)),
            mainProduct: new this.ProductEntity(initialData.mainProduct),
            productAdvantages: (initialData.productAdvantages || []).map((item) => new this.NoteEntity(item)),
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default VendorCard;
