import React from "react";

class Search extends React.Component {
    /**
     * @public
     * @method render
     * @returns {React.Element}
     */
    render() {
        return (
            <div className="faq__search search">
                <div className="search__header">
                    <p className="search__title f-weight-4">
                        Поиск по часто задаваемым вопросам
                    </p>
                </div>

                <div className="search__body">
                    <div className="search__input">
                        <input
                            type="text"
                            className="form-control bg-white"
                            placeholder="input text"
                        />

                        <button
                            // onClick={this._toSearchResults}
                            className="reset-btn-styles search__to-results cursor-pointer d-flex justify-content-center align-items-center"
                            type="button"
                        >
                            <i className="icon icon-search" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
