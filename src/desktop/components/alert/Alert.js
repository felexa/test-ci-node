import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class Alert extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHidden: false
        };

        this._close = this._close.bind(this);
    }

    /**
     * @private
     * @method _hasIcon
     * @returns {boolean}
     */
    _hasIcon() {
        return Boolean(this.props.iconName);
    }

    /**
     * @private
     * @method _isCloseable
     * @returns {boolean}
     */
    _isCloseable() {
        return Boolean(this.props.closeable);
    }

    /**
     * @private
     * @method _close
     * @returns {void}
     */
    _close() {
        this.setState({
            isHidden: true
        });
    }

    /**
     * @protected
     * @method render
     * @returns {string}
     */
    render() {
        return (
            <div className={classNames(`alert-${this.props.type}`, this.props.className, {"d-none": this.state.isHidden})}>
                {this._hasIcon() && (
                    <div className="d-flex align-items-center mr-8">
                        <span className={classNames(`color-gray icon icon-${this.props.iconName}`)} />
                    </div>
                )}

                <div dangerouslySetInnerHTML={{__html: this.props.content}} />

                {this._isCloseable() && (
                    <span className="color-gray icon icon-close" onClick={this._close} />
                )}
            </div>
        );
    }
}

Alert.propTypes = {
    type: PropTypes.string,
    iconName: PropTypes.string,
    content: PropTypes.string,
    closeable: PropTypes.bool,
    className: PropTypes.string
};

Alert.defaultProps = {
    type: "default",
    iconName: "",
    content: "",
    closeable: false,
    className: ""
};

export default Alert;
