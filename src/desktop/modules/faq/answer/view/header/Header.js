import React from "react";
import PropTypes from "prop-types";

import Redactor from "components/redactor/Redactor";

class Header extends React.Component {
    /**
     * @public
     * @method render
     * @returns {React.Element}
     */
    render() {
        return (
            <header className="faq-answer__header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <h1 className="faq-answer__title f-weight-5">
                                { this.props.title }
                            </h1>

                            <Redactor
                                className="mb-16"
                                lastUpdateDate={new Date(this.props.lastUpdateDateAsMilliseconds)}
                                profile={this.props.author}
                                reviewer={this.props.reviewer}
                            />
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.instanceOf(Object).isRequired,
    reviewer: PropTypes.instanceOf(Object).isRequired,
    lastUpdateDateAsMilliseconds: PropTypes.number.isRequired
};

export default Header;
