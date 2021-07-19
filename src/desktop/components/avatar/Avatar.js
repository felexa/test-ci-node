import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Resource from "app/core/resource";

class Avatar extends React.Component {
    constructor(props) {
        super(props);

        this.defaultBackgroundColor = "rgba(136, 143, 154, 0.16)";

        /**
         * @property linksResource
         * @type {Resource}
         */
        this.linksResource = Resource.links;

        /**
         * @property colors
         * @type {Array}
         */
        this.colors = [
            "#F04144",
            "#FD8D35",
            "#FEC747",
            "#69DC89",
            "#3B9F51",
            "#70CFED",
            "#0F89EF",
            "#BD4CD9",
            "#A293EE",
            "#FC5893"
        ];

        this.ref = {
            avatar: React.createRef()
        };
    }

    /**
     * @protected
     * @method componentDidMount
     */
    componentDidMount() {
        this._setDefaultAvatar();
    }

    /**
     * @private
     * @method _hasDefaultAvatar
     * @returns {boolean}
     */
    _hasDefaultAvatar() {
        return this._getProfile().getAvatar().getSmall() === this.linksResource.icons.defaultAvatarUrl;
    }

    /**
     * @private
     * @method _hasAvatar
     * @returns {boolean}
     */
    _hasAvatar() {
        /* eslint-disable max-len */
        return Boolean(this._getProfile().getAvatar().getSmall()) && !this._hasDefaultAvatar();
    }

    /**
     * @private
     * @method _hasCompanyLogo
     * @returns {boolean}
     */
    _hasCompanyLogo() {
        return this._hasCompanyAgent() && Boolean(this._getProfile().getCompany().getLogo().getSmall());
    }

    /**
     * @private
     * @method _hasAvatarAsImage
     * @returns {boolean}
     */
    _hasAvatarAsImage() {
        return this._hasCompanyLogo() || this._hasAvatar();
    }

    /**
     * @private
     * @method _hasCompanyAgent
     * @returns {boolean}
     */
    _hasCompanyAgent() {
        return Boolean(this._getCompany().getId());
    }

    /**
     * @private
     * @method _setDefaultAvatar
     * @returns {Avatar}
     */
    _setDefaultAvatar() {
        if (this.ref.avatar.current && !this.ref.avatar.current.style.background && !this._hasAvatarAsImage()) {
            this.ref.avatar.current.style.backgroundColor = this._getRandomColor();
        }

        return this;
    }

    /**
     * @private
     * @method _getAvatar
     * @returns {Image}
     */
    _getAvatar() {
        return this._hasCompanyAgent() ?
            this._getProfile().getCompany().getLogo() :
            this._getProfile().getAvatar();
    }

    /**
     * @private
     * @method _getSize
     * @returns {number}
     */
    _getSize() {
        return this.props.size;
    }

    /**
     * @private
     * @method _getProfile
     * @returns {Object}
     */
    _getProfile() {
        return this.props.profile;
    }

    /**
     * @private
     * @method _getCompany
     * @returns {Company}
     */
    _getCompany() {
        return this._getProfile().getCompany();
    }

    /**
     * @private
     * @method _getRandomColor
     * @returns {string}
     */
    _getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    /**
     * @private
     * @method _getFirstCharOfName
     * @returns {string}
     */
    _getFirstCharOfName() {
        return this._getProfile().getName().charAt(0);
    }

    /**
     * @private
     * @method _getImageSize
     * @returns {string}
     */
    _getImageSource() {
        let imageSize = {
            small: this._getAvatar().getSmall(),
            medium: this._getAvatar().getMedium()
        };

        return imageSize[this.props.imageSize];
    }

    /**
     * @public
     * @method render
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div
                className={classnames("avatar d-flex align-items-center justify-content-center overflow-hidden rounded-100 flex-shrink-0", {
                    "avatar--default": !this._hasAvatarAsImage()
                })}
                ref={this.ref.avatar}
                style={{width: this._getSize(), height: this._getSize(), backgroundColor: this.defaultBackgroundColor}}
            >
                {this._hasAvatarAsImage() && (
                    <img
                        src={this._getImageSource()}
                        alt={this._getAvatar().getAlt()}
                        title={this._getProfile().getFullName()}
                        width={this._getSize()}
                        height={this._getSize()}
                    />
                )}

                {!this._hasAvatarAsImage() && (
                    <span title={this._getProfile().getFullName()}>
                        {this._getFirstCharOfName()}
                    </span>
                )}
            </div>

        );
    }
}

Avatar.propTypes = {
    profile: PropTypes.instanceOf(Object).isRequired,
    size: PropTypes.number,
    imageSize: PropTypes.string
};

Avatar.defaultProps = {
    size: 32,
    imageSize: "small"
};

export default Avatar;
