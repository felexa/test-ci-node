import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class ReturnPolicy extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    render() {
        return (
            <div className="text-black line-height-1-5">
                {this.props.policy.getDescription()}
                &nbsp;
                {this.props.policy.getUrl() && (
                    <a href={this.props.policy.getUrl()} className="text-decoration-none" target="_blank">
                        {this.stringsResource.moreDetails}
                    </a>
                )}
            </div>
        );
    }
}

ReturnPolicy.propTypes = {
    policy: PropTypes.instanceOf(Object).isRequired
};

export default ReturnPolicy;
