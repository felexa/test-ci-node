import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Rubric from "components/rubric/product/Rubric";

class Prices extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="prices">
                <div className="prices__header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col d-flex align-items-center justify-content-between">
                                <p className="prices__title">
                                    { this.props.title }
                                </p>

                                <button
                                    className="btn-link text-uppercase btn-sm"
                                    type="button"
                                    onClick={this.props.viewAll}
                                >
                                    <span className="d-md-none">
                                        {this.stringsResource.all}
                                    </span>

                                    <span className="d-none d-md-inline">
                                        {this.stringsResource.viewAll}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="prices__body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <Rubric
                                    items={this.props.rubrics}
                                    addToBasket={this.props.addToBasket}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Prices.propTypes = {
    title: PropTypes.string,
    rubrics: PropTypes.instanceOf(Array),
    viewAll: PropTypes.func,
    addToBasket: PropTypes.func
};

Prices.defaultProps = {
    title: "",
    rubrics: [],
    viewAll: () => {},
    addToBasket: () => {}
};

export default Prices;
