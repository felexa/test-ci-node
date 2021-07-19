import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import MicroDataWebPage from "components/microData/WebPage";

import Header from "./header/Header";
import Program from "./program/Program";
import Advantages from "./advantages/Advantages";
import Filling from "./filling/Filling";
import Terms from "./terms/Terms";

import styles from "../styles/main.module.scss";

class Insurance extends React.Component {
    /**
     * @private
     * @method _getPageInfo
     * @returns {PageInfo}
     */
    _getPageInfo() {
        // eslint-disable-next-line react/prop-types
        return this.props.options.initialData.pageInfo;
    }

    /**
     * @private
     * @method _getPresenter
     * @returns {Presenter}
     */
    _getPresenter() {
        return this.props.options.presenter;
    }

    /**
     * @private
     * @method _getFaq
     * @returns {FAQ[]}
     */
    _getFaq() {
        return this.props.options.initialData.faq;
    }

    /**
     * @private
     * @method _getAdvantages
     * @returns {Array}
     */
    _getAdvantages() {
        return this.props.options.initialData.advantages;
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="insurance">
                <MicroDataWebPage
                    pageInfo={this._getPageInfo()}
                />

                <style jsx>
                    {styles}
                </style>

                <Header />

                <Program />

                <Advantages items={this._getAdvantages()} />

                <Filling />

                <Terms items={this._getFaq()} />
            </div>
        );
    }
}

Insurance.propTypes = {
    options: PropTypes.instanceOf(Object).isRequired
};

export default Insurance;
