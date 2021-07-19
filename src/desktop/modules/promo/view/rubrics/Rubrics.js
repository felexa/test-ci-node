import React from "react";
import PropTypes from "prop-types";

import ProductRubric from "app/desktop/components/rubric/product/Rubric";

class Rubrics extends React.Component {
    /**
     * @public
     * @method render
     * @returns {React.Element}
     */
    render() {
        return (
            <div className="promo__products">
                <div className="container-fluid">
                    <div className="row row--no-horizontal-sm-margins">
                        <div className="col">
                            <ProductRubric
                                items={this.props.items}
                                minRubricItems={10}
                                addToBasket={this.props.addToBasket}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Rubrics.propTypes = {
    items: PropTypes.instanceOf(Array),
    addToBasket: PropTypes.func.isRequired
};

Rubrics.defaultProps = {
    items: {}
};

export default Rubrics;
