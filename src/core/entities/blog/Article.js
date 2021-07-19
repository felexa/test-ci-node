import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";
import Category from "app/core/entities/blog/Category";
import Profile from "app/core/entities/profile/Profile";
import ArticleSection from "app/core/entities/blog/ArticleSection";

class Article extends Entity {
    /**
     * @method getTitle
     * @returns {*|string}
     */
    getTitle() {
        return this.entity.title || "";
    }

    /**
     * @method getSubTitle
     * @returns {*|string}
     */
    getSubTitle() {
        return this.entity.subTitle || "";
    }

    /**
     * @method getCategory
     * @returns {Category}
     */
    getCategory() {
        return new Category(this.entity.category);
    }

    /**
     * @method getAuthor
     * @returns {Profile}
     */
    getAuthor() {
        return new Profile(this.entity.author);
    }

    /**
     * @method getAuthor
     * @returns {Profile}
     */
    getCensor() {
        return new Profile(this.entity.censor);
    }

    /**
     * @method getViewsCount
     * @returns {string|number}
     */
    getViewCount() {
        return this.entity.viewCount || 0;
    }

    /**
     * @method getDescription
     * @returns {*|string}
     */
    getDescription() {
        return this.entity.description || "";
    }

    /**
     * @method getResourceName
     * @returns {string}
     */
    getResourceName() {
        return this.entity.resourceName || "";
    }

    /**
     * @method getPublishDate
     * @returns {string}
     */
    getPublishDate() {
        return this.entity.createdAt || "";
    }

    /**
     * @method getUpdatedAt
     * @returns {string}
     */
    getUpdatedAt() {
        return this.entity.updatedAt || "";
    }

    /**
     * @method getPreview
     * @returns {Image}
     */
    getPreview() {
        return new Image(this.entity.preview);
    }

    /**
     * @method getAlias
     * @returns {string}
     */
    getAlias() {
        return this.entity.alias || "";
    }

    /**
     * @method getUrl
     * @returns {string}
     */
    getUrl() { // todo delete
        return this.entity.url || "";
    }

    /**
     * @method getPathToArticle
     * @returns {string}
     */
    getPathToArticle() { // todo link from backend
        return `/blog/${this.getCategory().getAlias()}/${this.getAlias()}/` || "";
    }

    /**
     * @method getPathToCategory
     * @returns {string}
     */
    getPathToCategory() { // todo link from backend
        return `/blog/${this.getCategory().getAlias()}/`;
    }

    /**
     * @method getUrl
     * @returns {string}
     */
    getContent() {
        return this.entity.content || "";
    }

    /**
     * @method getUrl
     * @returns {ArticleSection[]}
     */
    getSections() {
        return (this.entity.sections || []).map((item) => new ArticleSection(item));
    }

    /**
     * @method getRelatedArticles
     * @returns {Article[]}
     */
    getRelatedArticles() {
        let relatedArticles = this.entity.relatedArticles;

        return ((Array.isArray(relatedArticles) && relatedArticles) || []).map((item) => new Article(item));
    }
}

export default Article;
