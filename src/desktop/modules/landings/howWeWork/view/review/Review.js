import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import ReviewRubric from "../reviewRubric/ReviewRubric";

class Review extends React.Component {
    constructor(props) {
        super(props);

        this.review = props.review;

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section className="review">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <header className="review__header">
                                <h2 className="review__title how-it-works-section__title f-weight-5 color-black text-center line-height-1-5">
                                    {this.stringsResource.doctorsAboutProject}
                                </h2>
                            </header>

                            <div className="review__body">
                                <ReviewRubric
                                    items={this.review}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Review.propTypes = {
    review: PropTypes.instanceOf(Array)
};

Review.defaultProps = {
    review: []
};

export default Review;
