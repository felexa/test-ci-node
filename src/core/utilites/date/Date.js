import moment from 'moment/min/moment-with-locales';

class Date {
    /**
     * @public
     * @method formatPerDayMonthYear
     * @returns {string}
     */
    formatPerDayMonthYear(local, date) {
        moment.locale(local);

        return moment(date, "DD.MM.YYYY").format('LL');
    }

    /**
      * @public
      * @method formatPerMonthYear
      * @returns {string}
      */
    formatPerMonthYear(local, date) {
        moment.locale(local);

        let momentDate = moment.utc(date),
            month = momentDate.format('MMMM'),
            year = momentDate.format('YYYY');

        return `${month} ${year}`;
    }
}

export default Date;
