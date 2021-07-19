import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

import Resource from "app/core/resource";
import Env from "app/core/environment";
import KeyboardEnum from "app/core/utilites/enum/keyboard";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.keyboardEnum = KeyboardEnum.getInstance();

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {
            value: ""
        };

        this._changeSearchValue = this._changeSearchValue.bind(this);
        this._changeSearchValueByKeyPress = this._changeSearchValueByKeyPress.bind(this);
        this._clearSearchResults = this._clearSearchResults.bind(this);
        this._getItemsByQueryWithDelay = _.debounce(this._getItemsByQuery, 400);
    }

    /**
     * @private
     * @method _isEnoughCharactersForQuery
     * @return {boolean}
     */
    _isEnoughCharactersForQuery() {
        return this.state.value.length >= 3;
    }

    /**
     * @private
     * @method _changeSearchValue
     * @param event {Object}
     * @return {Search}
     */
    _changeSearchValue(event) {
        this.setState({ value: event.target.value });

        // eslint-disable-next-line no-extra-boolean-cast
        if (Boolean(event.target.value)) {
            this._getItemsByQueryWithDelay();
        } else {
            this.props.getItemsByQuery("");
        }

        return this;
    }

    /**
     * @private
     * @method _getItemsByQuery
     * @param event {Object}
     * @param newValue {string}
     * @return {Search}
     */
    _getItemsByQuery() {
        if (this.state.value && (this._isEnoughCharactersForQuery())) {
            this.props.getItemsByQuery(this.state.value);
        }

        return this;
    }

    /**
     * @private
     * @method _changeSearchValueByKeyPress
     * @param event {Object}
     * @returns {Search}
     */
    _changeSearchValueByKeyPress(event) {
        if (this.keyboardEnum.isEnter(event.nativeEvent.code) && this._isEnoughCharactersForQuery()) {
            this._changeSearchValue(event);
        }

        return this;
    }

    /**
     * @private
     * @method _clearSearchResults
     * @returns {Search}
     */
    _clearSearchResults() {
        this.setState({value: ""},
            () => this.props.getItemsByQuery(this.state.value));

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="drugstore__search">
                <div className="to-search">
                    <i className="icon icon-search" />
                </div>
                <input
                    placeholder={this.stringsResource.searchByAddressOrDrugstoreName}
                    autoComplete="off"
                    onChange={this._changeSearchValue}
                    onKeyPress={this._changeSearchValueByKeyPress}
                    value={this.state.value}
                    type="text"
                />
                {Boolean(this.state.value) && (
                    <button
                        onClick={this._clearSearchResults}
                        className="clean-search"
                        type="button"
                    >
                        <i className="icon icon-close" />
                    </button>
                )}
            </div>
        );
    }
}

Search.propTypes = {
    getItemsByQuery: PropTypes.func.isRequired
};

export default Search;
