import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Success extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        /**
         * @property env
         * @type {Env}
         */
        this.env = Env.getInstance();
    }

    /**
     * @method _buildSuccessIconUrl
     * @returns {string}
     * @private
     */
    _buildSuccessIconUrl() {
        return `${this.env.getMainImageRepository()}/temp-images/thank-comment-.svg`;
    }

    render() {
        return (
            <div className="success-review-creation">
                <div className="success-review-creation__body">
                    <img src={this._buildSuccessIconUrl()} alt="" />

                    <strong>
                        {this.stringsResource.thank}!
                    </strong>

                    {this.props.message}
                </div>
            </div>
        );
    }
}

Success.propTypes = {
    message: PropTypes.string
};

Success.defaultProps = {
    message: ""
};

export default Success;
