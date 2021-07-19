import React from "react";
import PropTypes from "prop-types";
import ItemsForDesktop from "./ItemsForDesktop";

class DesktopView extends React.Component {
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
     * @method _createAsideGroup
     * @returns {React.element}
     */
    _createAsideGroup() {
        return this.props.allCategory.map((item, index) => (
            <div key={index} className="aside__group">
                <a href={item.getUrl()} className="aside__category text-decoration-none">{item.getName()}</a>
                {item.hasChildren() && (
                    <ItemsForDesktop item={item} />
                )}
            </div>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <aside className="aside aside--desktop">
                {this._isCategory() && this._createAsideGroup()}
            </aside>
        );
    }
}

DesktopView.propTypes = {
    allCategory: PropTypes.instanceOf(Array).isRequired
};

export default DesktopView;
