import React from "react";
import PropTypes from "prop-types";

import Title from "desktop/components/title/Title";
import ThreadItem from "components/reviewThread/project/doctor/ThreadItem";
import Carousel from "desktop/components/carousel/Carousel";

class Rubric extends React.Component {
    constructor(props) {
        super(props);

        this.carouselConfig = {
            slidesPerView: "auto",
            slideClass: "rubric__item",
            loop: false,
            spaceBetween: 10
        };
    }

    /**
     * @method renderItems
     * @returns {Array}
     */
    renderItems(items) {
        return items.map((item) => (
            <div key={item.getId()} className="rubric__item bg-white rounded-16 new-super-box-shadow">
                <ThreadItem item={item} isShowUnpacking={false} />
            </div>
        ));
    }

    /**
     * @method renderRubric
     * @param rubric {Rubric}
     * @return {string}
     */
    renderRubric(rubric) {
        return (
            <section className="rubric rubric--project-review" key={rubric.getId()}>
                <header className="rubric__header">
                    <Title config={{title: rubric.getName()}} noGrid iconId={rubric.getIconId()} />
                </header>

                <div className="rubric__body">
                    <div className="rubric__items">
                        <Carousel
                            config={this.carouselConfig}
                            hidePagination
                            showBlur
                            navigateNext={this.props.selectNextItem}
                        >
                            {this.renderItems(rubric.getItems())}
                        </Carousel>
                    </div>
                </div>
            </section>
        );
    }

    /**
     * @method render
     * @returns {Array}
     */
    render() {
        return this.props.items.map((item) => this.renderRubric(item));
    }
}

Rubric.propTypes = {
    items: PropTypes.instanceOf(Array).isRequired,
    selectNextItem: PropTypes.func
};

Rubric.defaultProps = {
    selectNextItem() {}
};

export default Rubric;
