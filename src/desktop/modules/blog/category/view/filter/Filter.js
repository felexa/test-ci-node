import React from "react";

class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.filters = [
            {title: "Медицина"},
            {title: "Здоровый образ"},
            {title: "Спорт"},
            {title: "Все рубрики"}
        ];
    }

    /**
     * @private
     * @method _renderFilters
     * @returns {Array}
     */
    _renderFilters() {
        return this.filters.map((item) => (
            <div className="filter__item">
                <label className="custom-input--checkbox">
                    <input type="checkbox" value="" />

                    <span className="custom-input__state">
                        <span className="custom-input__animation_bg" />
                    </span>

                    <span className="custom-input__name">
                        { item.title }
                    </span>
                </label>
            </div>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="filter category__filter">
                <header className="filter__header">
                    <div className="filter__title f-weight-5">
                        Рубрики
                    </div>
                </header>

                <div className="filter__body">
                    <div className="filter__items d-flex align-items-start flex-wrap">
                        { this._renderFilters() }
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;
