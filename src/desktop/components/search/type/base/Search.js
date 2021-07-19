/* eslint-disable react/no-unused-state */
import _ from "lodash";
import React from "react";

import Env from "app/core/environment";
import LanguageEnum from "app/core/utilites/enum/language";

import MenuService from "app/core/services/menu";
import SearchService from "app/core/services/search";

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.env = Env.getInstance();
        this.languageEnum = LanguageEnum.getInstance();

        this.menuService = MenuService.getInstance();
        this.searchService = SearchService.getInstance();
        this.loadSuggestions = this.loadSuggestions.bind(this);
        this.debounceQueryRequest = _.debounce(this.loadSuggestions, 400);
    }

    componentDidMount() {
        this.menuService.on("toggle", this.clearSuggestions);

        this.setState({ isLoadActive: false, isDisabled: false });
    }

    componentWillUnmount() {
        this.menuService.off("toggle", this.clearSuggestions);
    }

    /**
     * @private
     * @method loadSuggestions
     * @param event {Object}
     * @param newValue {string}
     * @return {void}
     */
    loadSuggestions({ value }) {
        if (value && (value.length >= 3)) {
            this.getItemsByQuery(value, (items) => {
                this.setState({ suggestions: items });
            });
        }
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

        this.searchService.getItemsByQuery(query, success, () => success([]));

        return this;
    }

    /**
     * @private
     * @method buildURLToRedirect
     * @param pathname {string}
     * @returns {string}
     */
    buildURLToRedirect(pathname) {
        let language = this.languageEnum.isRu(Env.getInstance().getLanguage()) ? "" : `${Env.getInstance().getLanguage()}/`;

        return `${this.env.getBitrixHost()}/${language}${pathname}`;
    }

    /**
     * @private
     * @method togglePromoBanner
     * @param state {Boolean}
     * @returns {Search}
     */
    togglePromoBanner(state) {
        let promoBanner = document.querySelector(".promo-banner"),
            isSmallScreen = window.innerWidth < 992;

        if (promoBanner) {
            if (state && isSmallScreen) {
                promoBanner.classList.add("d-none");
                promoBanner.classList.remove("d-flex");
            }

            if (!state) {
                promoBanner.classList.add("d-flex");
                promoBanner.classList.remove("d-none");

                if (isSmallScreen) {
                    window.scroll({ top: 40 });
                }
            }
        }

        return this;
    }

    /**
     * @private
     * @method toggleMobileBuyBtn
     * @param state {Boolean}
     * @returns {Search}
     */
    toggleMobileBuyBtn(state) {
        let mobileBuyBtn = document.querySelector(".buy-block.buy-block--xs");

        if (mobileBuyBtn) {
            mobileBuyBtn.classList.toggle("d-none", state);
        }

        return this;
    }

    /**
     * @private
     * @method  toggleUnusedElements
     * @param state {boolean}
     * @return {Search}
     */
    toggleUnusedElements(state) {
        this.togglePromoBanner(state);
        this.toggleMobileBuyBtn(state);

        return this;
    }
}

export default Search;
