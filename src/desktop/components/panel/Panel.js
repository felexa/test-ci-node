import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class Panel extends React.Component {
    render() {
        return (
            <section className={classnames("panel", "base-border", "rounded-10", "text-black", this.props.className)}>
                <header className="panel__header base-border-bottom p-16 m-0">
                    <span className="f-weight-5">{this.props.title}</span>
                </header>
                <div className="panel__body p-16">{this.props.children}</div>
            </section>
        );
    }
}

Panel.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

Panel.defaultProps = {
    className: ""
};

export default Panel;
