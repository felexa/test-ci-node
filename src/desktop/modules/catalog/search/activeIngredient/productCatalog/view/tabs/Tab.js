import React from "react";
import PropTypes from "prop-types";

class Tab extends React.Component {
    /**
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className="catalog__tab">
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
                    <div className="container-fluid sm-padding">
                        <div className="row">
                            <div className="col">
                                { this.props.children }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Tab.propTypes = {
    title: PropTypes.string,
    children: PropTypes.instanceOf(Object)
};

Tab.defaultProps = {
    title: "",
    children: []
};

export default Tab;
