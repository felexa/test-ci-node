/* eslint-disable react/prop-types,react/no-danger */
import React from "react";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Box from "app/core/components/Box";

import Header from "./header/Header";
import Drugs from "./drugs/Drugs";
import Warning from "./warning/Warning";
import Recommendations from "./recommendations/Recommendations";

import styles from "../styles/main.module.scss";

class Pregnancy extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property presenter
         * @type {Presenter}
         */
        this.presenter = props.options.presenter;

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @private
     * @method _hasDrugs
     * @returns {boolean}
     */
    _hasDrugs() {
        return Boolean(this._getDrugs().length);
    }

    /**
     * @private
     * @method _hasRecommendations
     * @returns {boolean}
     */
    _hasRecommendations() {
        return Boolean(this._getRecommendations().length);
    }

    /**
     * @private
     * @method _getDrugs
     * @returns {Array}
     */
    _getDrugs() {
        return this.props.options.initialData.drugs;
    }

    /**
     * @private
     * @method _getRecommendations
     * @returns {Array}
     */
    _getRecommendations() {
        return this.props.options.initialData.recommendations;
    }

    /**
     * @public
     * @method render
     * @returns {React.Element}
     */
    render() {
        return (
            <section className="pregnancy">
                <style jsx>
                    {styles}
                </style>

                <Header />

                <div className="pregnancy__body">
                    <div className="container-fluid">
                        <div className="row row--no-horizontal-sm-margins">
                            <div className="col">
                                <Box
                                    component="div"
                                    rounded={16}
                                    className="bg-white new-super-box-shadow"
                                >
                                    {this._hasDrugs() && (
                                        <div className="pregnancy-section">
                                            <Drugs
                                                items={this._getDrugs()}
                                            />
                                        </div>
                                    )}

                                    <div className="pregnancy-section">
                                        <Warning />
                                    </div>

                                    <div className="pregnancy-section">
                                        <p className="mb-16">
                                            { this.HTMLResource.pregnancy.contraindications }
                                        </p>

                                        <p>
                                            { this.HTMLResource.pregnancy.dangers }
                                        </p>
                                    </div>

                                    {this._hasRecommendations() && (
                                        <div className="pregnancy-section">
                                            <Recommendations
                                                items={this._getRecommendations()}
                                            />
                                        </div>
                                    )}
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Pregnancy;
