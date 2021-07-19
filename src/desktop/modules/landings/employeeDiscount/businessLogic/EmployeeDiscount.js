class EmployeeDiscount {
    constructor(props) {
        this._Repository = props.dependencies.Repository;

        this._EmployeeEntity = props.dependencies.EmployeeEntity;
        this._PageInfoEntity = props.dependencies.PageInfoEntity;
    }

    /**
     * @method _getRegistrationStatistics
     * @param resultContainer {Object}
     * @returns {EmployeeDiscount}
     * @public
     */
    _getRegistrationStatistics(resultContainer) {
        return new Promise((resolve) => {
            this._Repository.getRegistrationStatistics((statistics) => {
                resultContainer.registrationStatistics = statistics;

                resolve();
            }, () => {
                resolve();
            });
        });
    }

    /**
     * @method confirmInvite
     * @param profile {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {EmployeeDiscount}
     * @public
     */
    confirmInvite(profile, success, error) {
        this._Repository.confirmInvite(profile, success, error);

        return this;
    }

    /**
     * @public
     * @method getInitialProps
     * @returns {Promise}
     */
    getInitialProps() {
        let result = {
            expireDate: "2021-05-28T15:00:00",
            inviter: {
                name: "E",
                lastName: "Швец",
                middleName: "Г",
                avatar: {
                    src: {
                        original: "https://i.apteka24.ua/landings/employee-discount/shvets.jpg"
                    }
                }
            }
        };

        return new Promise((resolve) => {
            Promise.all([
                this._getRegistrationStatistics(result)
            ]).then(resolve);
        }).then(() => result).catch(() => result);
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
            expireDate: initialData.expireDate,
            registrationStatistics: initialData.registrationStatistics,
            pageInfo: new this._PageInfoEntity(pageInfo),
            inviter: new this._EmployeeEntity(initialData.inviter)
        };
    }
}

export default EmployeeDiscount;
