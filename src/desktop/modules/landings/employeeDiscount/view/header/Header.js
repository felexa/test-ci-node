import React from "react";
// import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

// import Timer from "components/timer/Timer";

class Header extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <header className="employee-discount__header color-white">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <div className="header__description">
                                <p>{this.HTMLResource.employeeDiscount.pharmacyDonatesMoney}</p>

                                <p
                                    dangerouslySetInnerHTML={
                                        {__html: this.HTMLResource.employeeDiscount.leaveYourPhone}
                                    }
                                />
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="header__timer timer">
                                {/*<Timer expireDate={new Date(this.props.expireDate)} />*/}
                                <span className="timer__text f-weight-5 text-size--h1 mb-0 color-white">
                                    {this.HTMLResource.employeeDiscount.launchingSoon}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

// Header.propTypes = {
// expireDate: PropTypes.string.isRequired
// };

export default Header;
