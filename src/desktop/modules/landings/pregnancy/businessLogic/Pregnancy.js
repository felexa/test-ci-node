class Pregnancy {
    constructor(props) {
        this.Repository = props.dependencies.Repository;
    }

    /**
     * @private
     * @method _getDrugs
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getDrugs(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getDrugs({}, (drugs) => {
                resultContainer.drugs = drugs;

                resolve();
            }, () => {});
        });
    }

    /**
     * @private
     * @method _getRecommendations
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getRecommendations(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getRecommendations({}, (recommendations) => {
                resultContainer.recommendations = recommendations;

                resolve();
            }, () => {});
        });
    }

    /**
     * @public
     * @method getInitialProps
     * @returns {Promise}
     */
    getInitialProps() {
        let result = {
            drugs: [],
            recommendations: []
        };

        return new Promise((resolve) => {
            Promise.all([
                this._getDrugs(result),
                this._getRecommendations(result)
            ]).then(resolve);
        })
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
            drugs: initialData.drugs,
            recommendations: initialData.recommendations,
            pageInfo
        };
    }
}

export default Pregnancy;
