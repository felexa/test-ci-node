import React from "react";
import PropTypes from "prop-types";

import Resource from "app/core/resource";

class Error extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(props.language);
    }

    /**
     * @private
     * @method hasError
     * @returns {boolean}
     */
    hasError() {
        return Boolean(this.props.error);
    }

    /**
     * @protected
     * @method render
     * @returns {void}
     */
    render() {
        return (
            <section className="error">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex flex-column align-items-center">
                                {!this.hasError() && <p className="error__title text-size--h1 mb-0">404</p>}

                                {!this.hasError() && (
                                    <p className="error__description text-size--h2 mb-0 text-uppercase">
                                        {this.stringsResource.pageNotFound} :(
                                    </p>
                                )}

                                {this.hasError() && (
                                    <p className="error__title text-size--h1 mb-0">
                                        {this.stringsResource.error.server.default.title} :(
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Error.propTypes = {
    language: PropTypes.string,
    error: PropTypes.instanceOf(Object)
};

Error.defaultProps = {
    language: "",
    error: null
};

export default Error;
