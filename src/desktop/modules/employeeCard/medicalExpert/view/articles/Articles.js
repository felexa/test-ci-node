import React from "react";
import PropTypes from "prop-types";

import Resource from "app/core/resource";
import Env from "app/core/environment";

class Articles extends React.Component {
    constructor(props) {
        super(props);

        this._stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    /**
     * @private
     * @method _renderArticles
     * @returns {Array}
     */
    _renderArticles() {
        return this.props.articles.map((item) => (
            <section key={item.getId()} className="medical-expert-card__article">
                <div className="medical-expert-card__article-header">
                    <h2 className="color-black f-weight-5 mb-0">{item.getTitle()}</h2>
                </div>
                <div className="medical-expert-card__article-body">
                    <p className="mb-0 mt-8">
                        <a
                            target="_blank"
                            href={item.getUrl()}
                            className="text-decoration-none"
                        >
                            {this._stringsResource.readArticle}
                        </a>
                    </p>
                </div>
            </section>
        ));
    }

    render() {
        return (
            <div className="medical-expert-card__articles">
                {this._renderArticles()}
            </div>
        );
    }
}

Articles.propTypes = {
    articles: PropTypes.instanceOf(Array)
};

Articles.defaultProps = {
    articles: []
};

export default Articles;
