import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Resource from "app/core/resource";
import Env from "app/core/environment";

class Section extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @private
     * @method _renderItems
     * @returns {React.ReactElement}
     */
    _renderItems(items) {
        return items.map((item) => (
            <div className="item w-100 new-super-box-shadow" key={item.id}>
                {item.title && (
                    <div className="item__title">
                        {item.title}
                    </div>
                )}

                <div className={classnames("item__preview", {"item__preview--new": item.new})}>
                    <img src={item.preview} alt="preview" />

                    {item.sticker && (
                        <div className="preview__sticker text-uppercase">
                            {item.sticker}
                        </div>
                    )}
                </div>

                <div className="item__body">
                    {item.subtitle && (
                        <div className="item__subtitle">
                            {item.subtitle}
                        </div>
                    )}

                    <div className="item__features">
                        {item.features.map((feature, index) => (
                            <div className="features__item d-flex align-items-center" key={index}>
                                <img className="features__icon" src={feature.icon} alt="icon" />

                                <div className="features__description line-height-1-5">
                                    {feature.description}
                                </div>
                            </div>
                        ))}
                    </div>

                    {item.link && (
                        <div className="item__buy">
                            <a className="btn-default btn-md text-uppercase" href={item.link}>
                                {this.stringsResource.buy}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        ));
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className={classnames("section", this.props.className)}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="section__header">
                                <div className="section__title">
                                    {this.props.rubric.title}
                                </div>
                            </div>

                            <div className="section__body">
                                <div className="section__items d-md-flex">
                                    {this._renderItems(this.props.rubric.items)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Section;

Section.propTypes = {
    rubric: PropTypes.instanceOf(Object),
    className: PropTypes.string
};

Section.defaultProps = {
    rubric: {},
    className: ""
};
