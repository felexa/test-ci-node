import React from "react";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Title from "components/title/Title";
import NativeCarousel from "components/nativeCarousel/NativeCarousel";
import Image from "components/image/Image";

class Brand extends React.Component {
    constructor(props) {
        super(props);

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.Resource = Resource;
        this.env = Env.getInstance();
    }

    /**
     * @private
     * @method getAllBrandsUrl
     * @returns {string}
     */
    getAllBrandsUrl() {
        return this.Resource.links.brands;
    }

    /**
     * @private
     * @method buildBrandUrl
     * @param brand {Brand}
     * @returns {string}
     */
    buildBrandUrl(brand) {
        return `${this.env.getBitrixHost()}/${brand.getUrl()}`;
    }

    /**
     * @method renderItems
     * @returns {Brand[]}
     */
    renderItems() {
        return this.props.rubric.getItems().map((item) => (
            <a
                className="brand__item"
                href={this.buildBrandUrl(item)}
                key={item.getId()}
                onClick={this.props.select}
            >
                <Image
                    data-src={item.getLogo().getSrc()}
                    className="lazyload"
                    alt={item.getLogo().getAlt()}
                    width={item.getLogo().getSizes().getMedium().getWidth()}
                    height={item.getLogo().getSizes().getMedium().getHeight()}
                />
            </a>
        ));
    }

    render() {
        let titleConfig = {
            showMore: {
                title: this.stringsResource.viewAll,
                shortTitle: this.stringsResource.all
            },
            title: this.props.rubric.getName()
        };

        return (
            <div className="brand">
                <Title config={titleConfig} iconId={this.props.rubric.getIconId()} />

                <NativeCarousel>
                    <div className="d-flex bg-white rounded-16 new-super-box-shadow flex-grow-1 justify-content-between">
                        { this.renderItems() }
                    </div>
                </NativeCarousel>

            </div>
        );
    }
}

Brand.propTypes = {
    rubric: PropTypes.instanceOf(Object).isRequired,
    select: PropTypes.func
};

Brand.defaultProps = {
    select() {}
};

export default Brand;
