import Navigation from './fixture/navigation';
import Team from './fixture/team';
import Redactor from './fixture/redactor';
import Partners from './fixture/partners';

class Repository {
    constructor() {
        this.navigation = Navigation;
        this.team = Team;
        this.partners = Partners;
        this.redactor = Redactor;
    }

    /**
     * @public
     * @method getNavigation
     * @param success {Function}
     * @returns {Promise}
     */
    getNavigation(success) {
        success(this.navigation);

        return Promise.resolve(this.navigation);
    }

    /**
     * @public
     * @method getRedactor
     * @param success {Function}
     * @returns {Promise}
     */
    getRedactor(success) {
        success(this.redactor);

        return Promise.resolve(this.redactor);
    }

    /**
     * @public
     * @method getLastUpdateDateAsMilliseconds
     * @param success {Function}
     * @returns {Promise}
     */
    getLastUpdateDateAsMilliseconds(success) {
        let dateAsMilliseconds = new Date("9/3/2020 16:00:00").getTime();

        success(dateAsMilliseconds);

        return Promise.resolve(dateAsMilliseconds);
    }

    /**
     * @public
     * @method getTeam
     * @param success {Function}
     * @returns {Promise}
     */
    getTeam(success) {
        success(this.team);

        return Promise.resolve(this.team);
    }

    /**
     * @public
     * @method getPartners
     * @param success {Function}
     * @returns {Promise}
     */
    getPartners(success) {
        success(this.partners);

        return Promise.resolve(this.partners);
    }
}

export default Repository;
