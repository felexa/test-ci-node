/* eslint-disable max-len */
/* eslint-disable no-extra-boolean-cast */
import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import LocalStorage from "app/core/utilites/storage/localStorage";

import Price from "components/price/Price";

class SearchResult extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.LocalStorage = LocalStorage.getInstance();

        this.state = {
            history: this._getHistory()
        };

        this._onSelectedItem = this._onSelectedItem.bind(this);
    }

    /**
     * @private
     * @method _isHistory
     * @return {boolean}
     */
    _isHistory() {
        return Boolean(this.state.history.length && this.props.value.length < 3);
    }

    /**
     * @private
     * @method _isSearchItems
     * @return {boolean}
     */
    _isSearchItems() {
        return Boolean(this.props.searchResult.getSearchItems().length && this.props.value.length >= 3);
    }

    /**
     * @private
     * @method _isSuggests
     * @return {boolean}
     */
    _isSuggests() {
        return Boolean(this.props.searchResult.getSuggests().length && this.props.value.length >= 3);
    }

    /**
     * @private
     * @method _isCategories
     * @return {boolean}
     */
    _isCategories() {
        return Boolean(this.props.searchResult.getCategories().length && this.props.value.length >= 3);
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
     * @method _setHistory
     * @param searchString {string}
     * @return {SearchResult}
     */
    _setHistory(searchString) {
        this.LocalStorage.setItem("searchHistory", [searchString, ...this.state.history.filter((item) => item.value !== searchString.value)]);

        return this;
    }

    /**
     * @private
     * @method _clearHistory
     * @return {SearchResult}
     */
    _clearHistory() {
        this.LocalStorage.setItem("searchHistory", []);
        this._refreshHistory();
        this.props.toggleVisibility();

        return this;
    }

    /**
     * @private
     * @method _deleteHistoryItem
     * @return {SearchResult}
     */
    _deleteHistoryItem(e) {
        this.LocalStorage.setItem("searchHistory", this.state.history.filter((item) => item.id !== e.target.dataset.id));
        this._refreshHistory();
        this.props.toggleVisibility();

        return this;
    }

    /**
     * @private
     * @method _onSelectedItem
     * @param e {Object}
     * @param textContent {string}
     * @return {void}
     */
    _onSelectedItem(e, textContent) {
        let value = textContent || e.currentTarget.textContent;

        this._setHistory({ id: `${Date.now()}`, value });
        this.props.onSelectedItem(e, value);
    }

    /**
     * @private
     * @method _refreshHistory
     * @return {void}
     */
    _refreshHistory() {
        this.setState({
            history: this._getHistory()
        });
    }

    /**
     * @private
     * @method _renderSearchResult
     * @return {React.Element}
     */
    _renderSearchResult() {
        return (
            <>
                {this._isHistory() && this._renderHistory()}

                {!this._isSearchItems() && /* !this._isSuggests() && */ this.props.searchResult.getSearchPhrase() && this.props.value.length >= 3 && this._renderEmpty()}

                {this._isSearchItems() && this._renderSearchItems()}

                {/* this._isSuggests() */false && this._renderSuggests()}

                {/* this._isCategories() */false && this._renderCategories()}
            </>
        );
    }

    /**
     * @private
     * @method _sortSearchItems
     * @return {Array}
     */
    _sortSearchItems() {
        let availableItems,
            notAvailableItems,
            result = this.props.searchResult.getSearchItems();

        if (Boolean(result.length)) {
            availableItems = this.props.searchResult.getSearchItems().filter((item) => Boolean(item.getPrice()));
            notAvailableItems = this.props.searchResult.getSearchItems().filter((item) => !Boolean(item.getPrice()));
            result = [...availableItems, ...notAvailableItems];
        }

        return result;
    }

    /**
     * @private
     * @method _reductProductName
     * @return {string}
     */
    _reductProductName(name) {
        let result = name;

        if (name.length > 80) {
            result = `${name.slice(0, 80)}...`;
        }

        return result;
    }

    /**
     * @private
     * @method _renderSearchItems
     * @return {React.Element}
     */
    _renderSearchItems() {
        return (
            <div className="suggestion">
                <header className="suggestion__header d-flex justify-content-between">
                    <a
                        className="text-decoration-none"
                        href="#"
                        onClick={(e) => this._onSelectedItem(e, this.props.searchResult.getSearchPhrase())}
                    >
                        {this.stringsResource.allSearchResults}
                    </a>
                </header>

                <div className="suggestion__body">
                    <div className="suggestion__items bg-white">
                        {this.props.searchResult.getSearchItems()
                            .slice(0, 5)
                            .map((item) => (
                                <a key={item.getId()} href={item.getUrl()} className="suggestion__item d-flex align-items-center w-100 suggestion__item--min-heigth">
                                    <div className="suggestion__preview d-flex align-items-center justify-content-center">
                                        <img src={item.getPreview().getSmall()} alt={item.getTitle()} />
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <p className="suggestion__description">{this._reductProductName(item.getTitle())}</p>
                                        <Price className="d-block" value={item.getPrice()} />
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
            </div>
        );
    }

    /**
     * @private
     * @method _renderSuggests
     * @return {React.Element}
     */
    _renderSuggests() {
        return (
            <div className="suggestion">
                <header className="suggestion__header">
                    <p>
                        {this.stringsResource.youMayBeLookingFor}:
                    </p>
                </header>
                <div className="suggestion__body">
                    <div className="suggestion__items bg-white">
                        {this.props.searchResult.getSuggests()
                            .slice(0, 10)
                            .map((item, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="d-flex align-items-center suggestion__item w-100"
                                    onClick={this._onSelectedItem}
                                >
                                    <i className="icon icon-search" />
                                    <span className="suggestion__item-description" dangerouslySetInnerHTML={{ __html: item }} />
                                </a>
                            ))}
                    </div>
                </div>
            </div>
        );
    }

    /**
     * @private
     * @method _renderCategories
     * @return {React.Element}
     */
    _renderCategories() {
        return (
            <div className="suggestion">
                <header className="suggestion__header">
                    <p>
                        {this.stringsResource.categories}:
                    </p>
                </header>
                <div className="suggestion__body">
                    <div className="suggestion__items bg-white">
                        {this.props.searchResult.getCategories()
                            .slice(0, 5)
                            .map((item, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="d-flex align-items-center suggestion__item w-100"
                                    onClick={this._onSelectedItem}
                                >
                                    <i className="icon icon-widget" />
                                    <span className="suggestion__item-description" dangerouslySetInnerHTML={{ __html: item.getName() }} />
                                </a>
                            ))}
                    </div>
                </div>
            </div>
        );
    }

    /**
     * @private
     * @method _renderHistory
     * @return {React.Element}
     */
    _renderHistory() {
        return (
            <div className="suggestion">
                <header className="suggestion__header d-flex justify-content-between">
                    <p>
                        {this.stringsResource.searchHistory}
                    </p>

                    <a className="text-decoration-none" href="#" onClick={() => this._clearHistory()}>
                        {this.stringsResource.clearList}
                    </a>
                </header>
                <div className="suggestion__body">
                    <div className="suggestion__items bg-white">
                        {this.state.history
                            .slice(0, 10)
                            .map((item) => (
                                <div key={item.id} className="suggestion__item d-flex align-items-center justify-content-between">
                                    <a href="#" className="text-decoration-none color-black d-flex align-items-center w-100" onClick={this._onSelectedItem}>
                                        <i className="icon icon-clock" />
                                        <span className="suggestion__item-description" dangerouslySetInnerHTML={{ __html: item.value }} />
                                    </a>
                                    <i className="icon icon-close" data-id={item.id} onClick={(e) => this._deleteHistoryItem(e)} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        );
    }

    /**
     * @private
     * @method _renderEmpty
     * @return {React.Element}
     */
    _renderEmpty() {
        return (
            <div className="suggestion">
                <div className="suggestion__body suggestion__body--empty d-flex align-items-center justify-content-center">
                    <p>
                        {this.stringsResource.emptySearchResult}
                    </p>
                </div>
            </div>
        );
    }

    render() {
        return (
            <>
                {this._renderSearchResult()}
            </>
        );
    }
}

SearchResult.propTypes = {
    searchResult: PropTypes.instanceOf(Object).isRequired,
    onSelectedItem: PropTypes.func.isRequired,
    value: PropTypes.string,
    toggleVisibility: PropTypes.func.isRequired
};

SearchResult.defaultProps = {
    value: ""
};

export default SearchResult;
