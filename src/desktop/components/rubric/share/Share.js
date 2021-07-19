/* eslint-disable react/prop-types */
import React from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";

import Env from "app/core/environment";
import Resource from "app/core/resource";

import Title from "components/title/Title";

class Share extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @method renderItems
     * @returns {Array}
     */
    renderItems() {
        return this.props.items.map(function (item) {
            return (
                <a href={item.getUrl()} className="share__item d-block text-decoration-none" key={item.getId()}>
                    <div className="item__preview rounded-10 d-flex justify-content-center align-items-center">
                        <img
                            className="rounded-10 lazyload"
                            data-src={item.getPreview().getSrc()}
                            alt={item.getPreview().getAlt()}
                        />
                    </div>

                    <p className="item__description text-gray text-uppercase f-weight-5">
                        { item.getDescription() }
                    </p>

                    <p className="item__title text-dark f-weight-5">
                        { item.getTitle() }
                    </p>
                </a>
            );
        });
    }

    /**
     * @public
     * @method render
     * @returns {String}
     */
    render() {
        let titleConfig = {
            showMore: {
                url: this.Resource.links.promo,
                title: this.stringsResource.viewAll,
                shortTitle: this.stringsResource.all
            },
            title: this.stringsResource.promotions
        };

        return (
            <section className={classNames("share", this.props.className)}>
                <div className="share__header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <Title config={titleConfig} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="share__body">
                    <div className="container-fluid">
                        <div className="row row--no-horizontal-margins-before-xl">
                            <div className="col w-100 share__items">
                                { this.renderItems() }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Share.defaultProps = {
    items: []
};

Share.propTypes = {
    items: PropTypes.instanceOf(Array)
};

export default Share;
