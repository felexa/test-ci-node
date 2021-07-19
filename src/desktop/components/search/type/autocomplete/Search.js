import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Router from "app/core/utilites/router";
import LocalStorage from "app/core/utilites/storage/localStorage";
import KeyboardEnum from "app/core/utilites/enum/keyboard";

import SearchBase from "../base/Search";
import SearchResult from "./SearchResult";

class Search extends SearchBase {
    constructor(props) {
        super(props);

        this.keyboardEnum = KeyboardEnum.getInstance();

        this.ref = {
            input: React.createRef()
        };

        this.emptySearchResult = this.searchService.convertSearchResultToEntity({});

        this.state = {
            value: "",
            isDisabled: true,
            searchResult: this.emptySearchResult,
            selectedSuggestion: null,
            isLoading: false
        };

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.Router = Router.getInstance();
        this.LocalStorage = LocalStorage.getInstance();

        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.changeSearchValue = this.changeSearchValue.bind(this);
        this._focusOnSearchInput = this._focusOnSearchInput.bind(this);
        this._clearSearchResults = this._clearSearchResults.bind(this);
        this.onSelectedItem = this.onSelectedItem.bind(this);
        this.loadSuggestions = this.loadSuggestions.bind(this);
        this.onSearchKeyPress = this.onSearchKeyPress.bind(this);
        this.clearSuggestions = this.clearSuggestions.bind(this);
    }

    componentDidMount() {
        this._getDefaultSearchValue();
    }

    /**
     * @private
     * @method _getDefaultSearchValue
     * @return {void}
     */
    _getDefaultSearchValue() {
        let searchRequest = this.Router.getCurrentRoute().query;

        if (this._isSearchPage()) {
            this.setState({ value: searchRequest.query || ""});
        }
    }

    /**
     * @private
     * @method _isSearchPage
     * @return {boolean}
     */
    _isSearchPage() {
        let pathname = this.Router.getCurrentRoute().pathname,
            searchPageRegExp = /^\/search\?/;

        return searchPageRegExp.test(pathname);
    }

    /**
     * @private
     * @method _isEmptyHistory
     * @returns {boolean}
     */
    _isEmptyHistory() {
        return Boolean(!this._getHistory().length);
    }

    /**
     * @private
     * @method changeSearchValue
     * @param event {Object}
     * @return {void}
     */
    async changeSearchValue(event) {
        await this.setState({ value: event.target.value });
        await this.debounceQueryRequest();
        await this.toggleVisibility();
    }

    /**
     * @private
     * @method clearSuggestions
     * @param state {boolean}
     * @returns {Search}
     */
    clearSuggestions(state) {
        if (state) {
            this._clearSearchResults();
        }

        return this;
    }

    /**
     * @private
     * @method _clearSearchResults
     * @returns {void}
     */
    _clearSearchResults() {
        this._toggleClickOnSearchContainer(false);
        this._onSuggestionsClearRequested(false);
        this.ref.input.current.blur();
    }

    /**
     * @private
     * @method _focusOnSearchInput
     * @returns {void}
     */
    _focusOnSearchInput() { //solve focus problem in tab and mobile mode
        if (this.clickOnSearchContainer) {
            this.ref.input.current.focus();
        }
    }

    /**
     * @private
     * @method _getHistory
     * @return {Array}
     */
    _getHistory() {
        return this.LocalStorage.getItem("searchHistory") || [];
    }

    /**
     * @private
     * @method getItemsByQuery
     * @param query {string}
     * @param success {Function}
     * @returns {Search}
     */
    getItemsByQuery(query, success) {
        this.toggleUnusedElements(true);

        this.searchService.getItemsByQueryAutocomplete(
            query,
            (items) => success(
                this.searchService.convertSearchResultToEntity(items)
            ),
            () => success(this.emptySearchResult)
        );

        return this;
    }

    /**
     * @private
     * @method _toggleLoader
     * @param state {boolean}
     * @returns {WishList}
     */
    _toggleLoader(state) {
        this.setState(() => ({isLoading: state}));

        return this;
    }

    /**
     * @private
     * @method loadSuggestions
     * @return {void}
     */
    loadSuggestions() {
        if (this.state.value && (this.state.value.length >= 3)) {
            this._toggleLoader(true);

            this.getItemsByQuery(this.state.value, (items) => {
                this.setState({ searchResult: items });
                this._toggleLoader(false);
            });
        }
    }

    /**
     * @private
     * @method onFocus
     * @return {void}
     */
    onFocus() {
        this.props.focus();
        this.toggleUnusedElements(true);
        this.toggleVisibility();
        this.debounceQueryRequest();
    }

    /**
     * @private
     * @method onBlur
     * @return {void}
     */
    onBlur() {
        if (this.clickOnSearchContainer) {
            this.ref.input.current.focus();
        } else {
            this.setState({ isOpen: false });
            this.toggleUnusedElements(false);
        }
    }

    /**
     * @private
     * @method onSearchKeyPress
     * @param event {Object}
     * @returns {void}
     */
    onSearchKeyPress(event) {
        if (this.keyboardEnum.isEnter(event.nativeEvent.code) && this.state.value.length >= 3) {
            this._setHistory({id: `${Date.now()}`, value: this.state.value});
            this._redirectToSearchResult();
        }
    }

    /**
     * @private
     * @method _onSuggestionsClearRequested
     * @return {void}
     */
    _onSuggestionsClearRequested() {
        this.toggleUnusedElements(false);
        this.setState({ searchResult: this.emptySearchResult, value: "" });
    }

    /**
     * @private
     * @method _redirectToSearchResult
     * @returns {void}
     */
    _redirectToSearchResult() {
        window.location.href = this.buildURLToRedirect(`search/?query=${this.state.value}`);
    }

    /**
     * @private
     * @method _setHistory
     * @param searchString {string}
     * @returns {Search}
     */
    _setHistory(searchString) {
        this.LocalStorage.setItem("searchHistory", [searchString, ...this._getHistory().filter((item) => item.value !== searchString.value)]);

        return this;
    }

    /**
     * @private
     * @method _toggleClickOnSearchContainer
     * @param state {boolean}
     * @returns {Search}
     */
    _toggleClickOnSearchContainer(state) {
        this.clickOnSearchContainer = state;

        return this;
    }

    /**
     * @public
     * @method toggleVisibility
     * @returns {void}
     */
    toggleVisibility() {
        if (this._isEmptyHistory() && this.state.value.length < 3) {
            this.setState({ isOpen: false });
        } else {
            this.setState({ isOpen: true });
        }
    }

    /**
     * @public
     * @method onSelectedItem
     * @param event {Object}
     * @param selectedItem {string}
     * @return {void}
     */
    onSelectedItem(event, selectedItem) {
        event.preventDefault();

        this.setState({ value: selectedItem, isOpen: false }, this._redirectToSearchResult);
    }

    render() {
        const {
            value, isOpen, isLoading, searchResult
        } = this.state;

        return (
            <div
                onMouseOut={() => this._toggleClickOnSearchContainer(false)}
                onMouseDown={() => this._toggleClickOnSearchContainer(true)}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                onClick={this._focusOnSearchInput}
                className={classNames("search", { "search--open": isOpen })}
            >
                <div>
                    <div className="to-search">
                        <i className="icon icon-search" />
                    </div>

                    <input
                        ref={this.ref.input}
                        placeholder={this.stringsResource.searchDrug}
                        onChange={this.changeSearchValue}
                        onKeyPress={this.onSearchKeyPress}
                        value={value}
                        className="search__input"
                    />

                    {value && isOpen && (
                    <button
                        onClick={this._clearSearchResults}
                        className="clean-search"
                        type="button"
                    >
                        <i className="icon icon-close" />
                    </button>
                    )}
                </div>

                {isOpen && (
                <div className={classNames("search-result", {"search-result--min-height loading": isLoading})}>
                    <SearchResult
                        searchResult={searchResult}
                        onSelectedItem={this.onSelectedItem}
                        value={value}
                        toggleVisibility={this.toggleVisibility}
                    />
                </div>
                )}

            </div>
        );
    }
}

Search.propTypes = {
    focus: PropTypes.func
};

Search.defaultProps = {
    focus: () => { }
};

export default Search;
