/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Title from "components/title/Title";
import Image from "components/image/Image";

import Item from "./Item";

class Awards extends React.Component {
    constructor(props) {
        super(props);

        this.titleConfig = {
            title: Resource.getStrings(Env.getInstance().getLanguage()).ourAwards
        };
    }

    /**
     * @method _renderItems
     * @returns {Array}
     * @private
     */
    _renderItems() {
        return this.props.items.map((item) => (
            <li key={item.getId()} className="d-flex">
                <Item award={item}>
                    <Image
                        data-src={item.getPreview().getOriginal()}
                        alt={item.getTitle()}
                        title={item.getTitle()}
                        className="lazyload"
                        width={item.getPreview().getSizes().getOriginal().getWidth()}
                        height={item.getPreview().getSizes().getOriginal().getHeight()}
                    />
                </Item>
            </li>
        ));
    }

    render() {
        return (
            <div className="awards rounded-10">
                <div className="awards__header">
                    <Title config={this.titleConfig} noGrid />
                </div>

                <div className="awards__body custom-scroll">
                    <ul className="awards__items d-flex flex-row bg-white rounded-10">
                        { this._renderItems() }
                    </ul>
                </div>
            </div>
        );
    }
}

Awards.propTypes = {
    items: PropTypes.instanceOf(Array)
};

Awards.defaultProps = {
    items: []
};

export default Awards;
