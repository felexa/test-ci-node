import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class AboutCompany extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.state = {
            isOpen: false,
            buttonName: this.stringsResource.show.more
        };

        this._isOpen = this._isOpen.bind(this);
        this._getCurrentButtonName = this._getCurrentButtonName.bind(this);
        this._toggleDescription = this._toggleDescription.bind(this);
    }

    /**
     * @private
     * @method _isOpen
     * @return {boolean}
     */
    _isOpen() {
        return this.state.isOpen;
    }

    /**
     * @private
     * @method _getCurrentButtonName
     * @return {string}
     */
    _getCurrentButtonName() {
        return this.state.buttonName;
    }

    /**
     * @private
     * @method _toggleDescription
     * @returns {Description}
     */
    _toggleDescription() {
        this.setState((prevState) => {
            let isOpen = prevState.isOpen;

            return {
                buttonName: !isOpen ? this.stringsResource.show.less : this.stringsResource.show.more,
                isOpen: !isOpen
            };
        });

        return this;
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className={classnames("about-company bg-white new-super-box-shadow rounded-16 color-black d-lg-flex", this.props.className)}>
                <div className="about-company__preview d-flex justify-content-center align-items-center order-md-2">
                    <img
                        src={this.props.aboutCompany.getLogo().getSrc()}
                        alt={this.props.aboutCompany.getLogo().getAlt()}
                    />
                </div>

                <div className="about-company__section">
                    <header>
                        <h2 className="about-company__title f-weight-5 color-black">
                            {this.stringsResource.vendorCard.aboutCompany}
                            {this.props.aboutCompany.getName()}
                        </h2>
                    </header>

                    <div className="about-company__body line-height-1-5">
                        <div
                            className={classnames("about-company__description", {open: this._isOpen()})}
                            dangerouslySetInnerHTML={{__html: this.props.aboutCompany.getDescription()}}
                        />

                        <span className="about-company__toggle" onClick={this._toggleDescription}>
                            {this._getCurrentButtonName()}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

AboutCompany.propTypes = {
    aboutCompany: PropTypes.instanceOf(Object).isRequired,
    className: PropTypes.string
};

AboutCompany.defaultProps = {
    className: ""
};

export default AboutCompany;
