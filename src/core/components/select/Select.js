import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class Select extends React.Component {
    render() {
        let {
            change, activeItem, items, className
        } = this.props;

        return (
            <div className={classnames("custom-select", className)}>
                <select defaultValue={activeItem} className="form-control" onClick={change}>
                    {items.map((item, i) => (
                        <option value={item.id} key={i}>{item.name}</option>
                    ))}
                </select>
                <i className="icon icon-chevron-down" />
            </div>
        );
    }
}

Select.defaultProps = {
    className: "",
    items: [],
    activeItem: ""
};

Select.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.string
        })
    ),
    activeItem: PropTypes.string,
    change: PropTypes.func.isRequired
};

export default Select;
