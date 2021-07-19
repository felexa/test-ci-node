/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Statistics extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    render() {
        return (
            <section className="statistics section color-black">
                <div className="container-fluid">
                    <div className="statistics__body">
                        <div className="statistics__items d-lg-flex justify-content-around">
                            <div className="item">
                                <div className="item__title">{this.stringsResource.registeredEmployees}</div>
                                <div className="item__value">{this.props.statistics.bonusCount}</div>
                            </div>

                            <div className="item">
                                <div className="item__title">{this.stringsResource.bonusesAccrued}</div>
                                <div className="item__value">{this.props.statistics.bonusAmount}</div>
                            </div>

                            <div className="item">
                                <div className="item__title">{this.stringsResource.giftsLeft}</div>
                                <div className="item__value">{this.props.statistics.slotsRemaining}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Statistics.propTypes = {
    statistics: PropTypes.instanceOf(Object)
};

Statistics.defaultProps = {
    statistics: {
        bonusCount: 234,
        bonusAmount: 2360,
        slotsRemaining: 1247
    }
};

export default Statistics;
