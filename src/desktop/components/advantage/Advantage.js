import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

class Advantage extends React.Component {
    constructor(props) {
        super(props);

        this.advantage = props.advantage;
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section className={classnames(this.props.className)}>
                <div className="advantage">
                    <div className="advantage__items d-flex flex-wrap flex-md-nowrap w-100">
                        {this.advantage.map((item) => (
                            <div key={item.getId()} className="advantage__item bg-white rounded-16 new-super-box-shadow">
                                <img src={item.getIcon().getSmall()} alt={item.getIcon().getAlt()} />
                                {item.getTitle() && <h3 className="item__title">{item.getTitle()}</h3>}
                                <p className="item__description">{item.getDescription()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}

Advantage.defaultProps = {
    className: ""
};

Advantage.propTypes = {
    advantage: PropTypes.instanceOf(Object).isRequired,
    className: PropTypes.string
};

export default Advantage;
