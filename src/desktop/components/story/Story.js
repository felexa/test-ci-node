import React from "react";
import PropTypes from 'prop-types';

class Story extends React.Component {
    /**
     * @method getTitle
     * @returns {string}
     */
    getTitle() {
        return "Истории";
    }

    /**
     * @method renderItems
     * @returns {Array}
     */
    renderItems() {
        return this.props.items.map(function (item) {
            return (
                <a
                    href={item.getUrl()}
                    key={item.getId()}
                    className="story__item"
                >
                    <img /*todo Image component*/
                        src={item.getPreview().getSrc()}
                        alt={item.getPreview().getAlt()}
                    />
                </a>
            );
        });
    }

    render() {
        return (
            <section className="page-section story">
                <div className="story__body">
                    <div className="container-fluid">
                        <div className="row row--no-horizontal-margins-before-xl">
                            <div className="col story__items w-100">
                                { this.renderItems() }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Story.defaultProps = {
    items: []
};

Story.propTypes = {
    items: PropTypes.instanceOf(Array)
};

export default Story;
