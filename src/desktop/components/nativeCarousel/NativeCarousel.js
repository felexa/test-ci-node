/* eslint-disable react/prop-types */
import React from "react";
import classnames from "classnames";

class NativeCarousel extends React.Component {
    render() {
        return (
            <div className={classnames("native-carousel", "native-carousel--ready", this.props.className)}>
                <div className="native-carousel__items custom-scroll">{this.props.children}</div>
            </div>
        );
    }
}

export default NativeCarousel;
