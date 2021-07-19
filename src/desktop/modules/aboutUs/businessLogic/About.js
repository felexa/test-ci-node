/* eslint-disable max-len */
class AboutUs {
    constructor(props) {
        this.Repository = props.dependencies.Repository;
        this.Router = props.dependencies.Router;

        this.DateEnum = props.dependencies.DateEnum;
        this.LanguageEnum = props.dependencies.LanguageEnum;

        this.EmployeeEntity = props.dependencies.EmployeeEntity;
        this.BrandEntity = props.dependencies.BrandEntity;
        this.PageInfoEntity = props.dependencies.PageInfoEntity;
        this.ProfileEntity = props.dependencies.ProfileEntity;
        this.MedicalExpertEntity = props.dependencies.MedicalExpertEntity;
    }

    /**
     * @method _getSectionTypeByContext
     * @param context {Object}
     * @returns {string}
     * @private
     */
    _getSectionTypeByContext(context) {
        let query = context.query,
            partsOfPath = context.asPath.match(/[(\/\w+(\-?))\/][^#?\s]+/)[0].replace("?", "/").split("/");

        return query.pageName || partsOfPath[partsOfPath.length - 2];

        // let query = context.query,
        //     partsOfPath = context.asPath.replace("?", "/").split("/"),
        //     sectionTypeIndex = 1,
        //     sectionTypeIndexWithLocal = 2;
        //
        // return query.pageName || partsOfPath[query.subpath ? sectionTypeIndexWithLocal : sectionTypeIndex];
    }

    /**
     * @private
     * @method _getRedactor
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getRedactor(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getRedactor((redactor) => {
                resultContainer.redactor = redactor;

                resolve();
            });
        });
    }

    /**
     * @private
     * @method _getPartners
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getPartners(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getPartners((partners) => {
                resultContainer.partners = partners;

                resolve();
            });
        });
    }

    /**
     * @private
     * @method _getNavigation
     * @param resultContainer {Object}
     * @param language {string}
     * @returns {Promise}
     */
    _getNavigation(resultContainer, language) {
        return new Promise((resolve) => {
            this.Repository.getNavigation((navigation) => {
                resultContainer.navigation = navigation[language];

                resolve();
            });
        });
    }

    /**
     * @private
     * @method _getLastUpdateDateAsMilliseconds
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getLastUpdateDateAsMilliseconds(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getLastUpdateDateAsMilliseconds((lastUpdateDateAsMilliseconds) => {
                resultContainer.lastUpdateDateAsMilliseconds = lastUpdateDateAsMilliseconds;

                resolve();
            });
        });
    }

    /**
     * @private
     * @method _getTeam
     * @param resultContainer {Object}
     * @returns {Promise}
     */
    _getTeam(resultContainer) {
        return new Promise((resolve) => {
            this.Repository.getTeam((team) => {
                resultContainer.team = team;

                resolve();
            });
        });
    }

    /**
     * @public
     * @method changeRoute
     * @param url {string}
     // * @param needReplace {boolean}
     * @returns {void}
     */
    changeRoute(url/*, needReplace = false*/) {
        // let methodName = needReplace ? "replace" : "to";
        //
        // this.Router[methodName](
        //     url,
        //     {shallow: true}
        // );

        window.location.assign(url);
    }

    /**
     * @public
     * @method getInitialProps
     * @param context {Object}
     * @returns {Promise}
     */
    getInitialProps(context) {
        let result = {
            freeDeliveryLastDate: "",
            lastUpdateDateAsMilliseconds: 0,
            navigation: [],
            redactor: {},
            reviewer: {},
            pageType: "",
            team: [],
            partners: [],
            specialities: {
                doctor: {},
                pharmacist: {},
                editor: {},
                manager: {}
            }
        };

        return Promise.all([
            this._getNavigation(result, context.language),
            this._getLastUpdateDateAsMilliseconds(result),
            this._getRedactor(result),
            this._getPartners(result),
            this._getTeam(result)
        ])
            .then(() => new Promise((resolve) => {
                result.pageType = this._getSectionTypeByContext(context);

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
            freeDeliveryLastDate: this.DateEnum.getFreeDeliveryLastDateAsValue(),
            lastUpdateDateAsMilliseconds: initialData.lastUpdateDateAsMilliseconds,
            redactor: new this.ProfileEntity(initialData.redactor),
            reviewer: new this.ProfileEntity({}),
            navigation: initialData.navigation,
            pageType: initialData.pageType,
            partners: initialData.partners.map((item) => new this.BrandEntity(item)),
            specialities: {
                doctors: (initialData.specialities.doctor.employees || []).map((item) => new this.MedicalExpertEntity(item)),
                pharmacists: (initialData.specialities.pharmacist.employees || []).map((item) => new this.MedicalExpertEntity(item)),
                manager: (initialData.specialities.manager.employees || []).map((item) => new this.MedicalExpertEntity(item)),
                editor: (initialData.specialities.editor.employees || []).map((item) => new this.MedicalExpertEntity(item))
            },
            pageInfo: new this.PageInfoEntity(pageInfo)
        };
    }
}

export default AboutUs;
