import React from "react";
import PropTypes from "prop-types";

class Share extends React.Component {
    render() {
        return (
            <div dangerouslySetInnerHTML={{ __html: this.props.content }} />
        );
    }
}

Share.propTypes = {
    content: PropTypes.string
};

Share.defaultProps = {
    content: ""
};

export default Share;
