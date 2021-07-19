import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class Tab extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    /**
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className={classNames("product-card__tab", this.props.className)}>
                {
                    false && (
                        <header>
                            {this.props.title && (
                                <h2
                                    className="text-black text-size--h4"
                                    dangerouslySetInnerHTML={{ __html: this.props.title }}
                                />
                            )}
                        </header>
                    )
                }

                <div className="tab__body">
                    { this.props.children }
                </div>
            </div>
        );
    }
}

Tab.propTypes = {
    title: PropTypes.string,
    children: PropTypes.instanceOf(Object),
    className: PropTypes.string
};

Tab.defaultProps = {
    title: "",
    children: [],
    className: ""
};

export default Tab;
