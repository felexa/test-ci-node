import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Strings from "app/core/utilites/strings";
import Translator from "app/core/utilites/strings/translator";
import Numbers from "app/core/utilites/numbers";
import Resource from "app/core/resource";

import Pagination from "desktop/components/pagination/Pagination";

class Questions extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property perPageCount
         * @type {number}
         */
        this.perPageCount = Infinity;

        /**
         * @property linksResource
         * @type {Resource}
         */
        this.linksResource = Resource.links;

        /**
         * @property strings
         * @type {Strings}
         */
        this.strings = Strings.getInstance();

        /**
         * @property translator
         * @type {Translator}
         */
        this.translator = Translator.getInstance();

        /**
         * @property numbers
         * @type {Numbers}
         */
        this.numbers = Numbers.getInstance();
    }

    /**
     * @private
     * @method _isDisplayedPagination
     * @returns {boolean}
     */
    _isDisplayedPagination() {
        return this.perPageCount < this.props.totalCount;
    }

    /**
     * @private
     * @method _hasDate
     * @param question {Object}
     * @returns {boolean}
     */
    _hasDate(question) {
        return Boolean(question.getUpdatedAt());
    }

    /**
     * @private
     * @method _getItems
     * @returns {Array}
     */
    _getItems() {
        return this.props.items.slice(0, this.perPageCount);
    }

    /**
     * @private
     * @method _getMonthNameByNumber
     * @param monthNumber {number}
     * @returns {string}
     */
    _getMonthNameByNumber(monthNumber) {
        return this.translator.getMonthNameByNumber(monthNumber);
    }

    /**
     * @private
     * @method _getCurrentPage
     * @returns {number}
     */
    _getCurrentPage() {
        return this.props.currentPage;
    }

    // /**
    //  * @private
    //  * @method _buildUrlForNextPage
    //  * @param page {number}
    //  * @returns {string}
    //  */
    // _buildUrlForNextPage(page) {
    //     return this.model.buildUrlWithQueryString({page});
    // }

    // /**
    //  * @private
    //  * @method _toNextPage
    //  * @param currentPage {number}
    //  * @returns {Classifier}
    //  */
    // _toNextPage(currentPage) {
    //     this.model.toPage(currentPage);
    //
    //     return this;
    // }

    /**
     * @private
     * @method _renderDate
     * @param question {FAQ}
     * @return {React.element}
     */
    _renderDate(question) {
        let date = new Date(question.getUpdatedAt());

        return (
            <p className="item__date mt-8">
                { date.getDate() } { this._getMonthNameByNumber(date.getMonth()) } { date.getFullYear() }
            </p>
        );
    }

    /**
     * @private
     * @method _renderItems
     * @returns {Array}
     */
    _renderItems() {
        return this._getItems().map((item) => (
            <div
                className="questions__item"
                key={item.getId()}
            >
                <a
                    href={`${this.linksResource.medicalAnswers}${item.getAlias()}/`}
                    className="item__question d-inline-block f-weight-4 text-decoration-none cursor-pointer"
                >
                    { item.getQuestion() }
                </a>

                {this._hasDate(item) && (
                    this._renderDate(item)
                )}
            </div>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.Element}
     */
    render() {
        return (
            <div className={classnames("questions", this.props.className, {"with-pagination": this._isDisplayedPagination()})}>
                <div className="questions__items">
                    { this._renderItems() }
                </div>

                {this._isDisplayedPagination() && (
                    <div className="questions__pagination d-flex align-items-center justify-content-center">
                        <Pagination
                            activePage={this._getCurrentPage()}
                            perPageCount={this.perPageCount}
                            totalCount={this.props.totalCount}
                            // change={this._toNextPage}
                            // buildUrl={this._buildUrlForNextPage}
                        />
                    </div>
                )}
            </div>
        );
    }
}

Questions.propTypes = {
    totalCount: PropTypes.number.isRequired,
    items: PropTypes.instanceOf(Array).isRequired,
    className: PropTypes.string,
    currentPage: PropTypes.number
};

Questions.defaultProps = {
    className: "",
    currentPage: 1
};

export default Questions;
