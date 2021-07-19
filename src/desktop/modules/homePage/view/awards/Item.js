/* eslint-disable react/prop-types */
import React from "react";

/**
 * @param props
 * @return {React.ReactElement<{href: *, target: string}>}
 * @constructor
 */
function AwardComponent(props) {
    let configForDivTag = {},
        configForLinkTag = {
            target: "_blank",
            href: props.award.getUrl()
        },
        tagName = props.award.getUrl() ? 'a' : 'div',
        tagConfig = props.award.getUrl() ? configForLinkTag : configForDivTag;

    return React.createElement(
        tagName,
        tagConfig,
        props.children
    );
}
export default AwardComponent;
