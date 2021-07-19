import React from "react";
import NextHead from "next/head";
import PropTypes from "prop-types";

class StructuredData extends React.Component {
    render() {
        return (
            <NextHead>
                {/* eslint-disable */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(this.props.schema)}}
                />
                {/* eslint-enable */}
            </NextHead>
        );
    }
}

StructuredData.propTypes = {
    schema: PropTypes.instanceOf(Object).isRequired
};

export default StructuredData;
