/* eslint-disable max-len */
import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Description extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    render() {
        return (
            <div className="catalog__description rounded-16 bg-white new-super-box-shadow mb-0 mt-5">
                <section className="description">
                    <header>
                        <h2 className="mb-24">
                            {this.stringsResource.searchDrugsByActiveIngredient}
                        </h2>
                    </header>

                    <div className="description__body">
                        <p className="mb-0">
                            {this.HTMLResource.aboutSearchDrugsByActiveIngredient}.
                        </p>
                    </div>
                </section>

                <section className="description">
                    <header>
                        <h2 className="mb-24">
                            {this.stringsResource.selectionDrugsByActiveIngredientOnline}
                        </h2>
                    </header>

                    <div className="description__body">
                        <p className="mb-24">
                            {this.HTMLResource.aboutSortingByActiveIngredient}.
                        </p>

                        <p className="mb-0">
                            {this.HTMLResource.aboutMethodsSearchingDrugs}.
                        </p>
                    </div>
                </section>
            </div>
        );
    }
}

export default Description;
