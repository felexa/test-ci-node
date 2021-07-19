import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Autosuggest from "react-autosuggest";

import KeyboardEnum from "app/core/utilites/enum/keyboard";

import SearchBase from "../base/Search";

const getSuggestionValue = (suggestion) => suggestion.NAME;
const renderSuggestion = (suggestion) => <a href="#">{suggestion.NAME}</a>;

class Search extends SearchBase {
    constructor() {
        super();

        this.keyboardEnum = KeyboardEnum.getInstance();

        this.state = {
            value: "",
            isDisabled: true,
            isLoadActive: true,
            suggestions: [],
            selectedSuggestion: null
        };

        this.onChange = this.onChange.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
        this.redirectToSearchResult = this.redirectToSearchResult.bind(this);
        this.onSearchKeyPress = this.onSearchKeyPress.bind(this);
        this.clearSuggestions = this.clearSuggestions.bind(this);
    }

    /**
     * @private
     * @method onChange
     * @param event {Object}
     * @param newValue {string}
     * @return {void}
     */
    onChange(event, { newValue }) {
        this.toggleUnusedElements(true);
        this.setState({value: newValue});
    }

    onSuggestionsClearRequested() {
        this.toggleUnusedElements(false);
        this.setState({ suggestions: [] });
    }

    onSuggestionSelected(event, selectedItem) {
        event.preventDefault();

        this.setState({ selectedSuggestion: selectedItem }, this.redirectToSearchResult);

        return false;
    }

    /**
     * @private
     * @method redirectToSearchResult
     * @returns {void}
     */
    redirectToSearchResult() {
        if (this.state.selectedSuggestion) {
            // eslint-disable-next-line max-len
            window.location.href = `${this.buildURLToRedirect(this.state.selectedSuggestion.suggestion.DETAIL_PAGE_URL)}/`;
        } else if (this.state.value) {
            window.location.href = this.buildURLToRedirect(`search/?query=${this.state.value}`);
        }
    }

    /**
     * @private
     * @method onSearchKeyPress
     * @param event {Object}
     * @returns {void}
     */
    onSearchKeyPress(event) {
        if (this.keyboardEnum.isEnter(event.nativeEvent.code)) {
            this.redirectToSearchResult();
        }
    }

    /**
     * @private
     * @method clearSuggestions
     * @param state {Object}
     * @returns {Search}
     */
    clearSuggestions(state) {
        if (state) {
            this.onSuggestionsClearRequested(true);
        }

        return this;
    }

    render() {
        const { value, suggestions, isDisabled } = this.state;

        const inputProps = {
            placeholder: 'Поиск препарата',
            value,
            disabled: isDisabled,
            onChange: this.onChange,
            onFocus: this.props.focus,
            onKeyPress: this.onSearchKeyPress
        };

        return (
            <div className="catalog-search">
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.debounceQueryRequest}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    onSuggestionSelected={this.onSuggestionSelected}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />

                <button
                    onClick={this.redirectToSearchResult}
                    disabled={this.state.isDisabled}
                    className={classNames("to-search", { loading: this.state.isLoadActive })}
                    type="button"
                >
                    <i className="icon icon-search" />
                </button>
            </div>
        );
    }
}

Search.propTypes = {
    focus: PropTypes.func
};

Search.defaultProps = {
    focus: () => {}
};

export default Search;
