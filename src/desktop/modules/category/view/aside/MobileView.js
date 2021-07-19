import React from "react";
import PropTypes from "prop-types";
import ItemsForMobile from "./ItemsForMobile";

class MobileView extends React.Component {
    /**
     * @private
     * @method _isCategory
     * @returns {boolean}
     */
    _isCategory() {
        return Boolean(this.props.allCategory.length);
    }

    /**
     * @private
     * @method _createAsideGropup
     * @returns {React.element}
     */
    _createAsideGropup() {
        return this.props.allCategory.map((item, index) => (
            <ItemsForMobile item={item} key={index} />
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <aside className="aside aside--mobile">
                {this._isCategory() && this._createAsideGropup()}
            </aside>
        );
    }
}

MobileView.propTypes = {
    allCategory: PropTypes.instanceOf(Array).isRequired
};

export default MobileView;
