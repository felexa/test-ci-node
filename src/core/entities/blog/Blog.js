import Entity from "app/core/entities/Entity";
import ArticleEntity from "app/core/entities/blog/Article";
import CategoryEntity from "app/core/entities/blog/Category";

class Blog extends Entity {
    /**
     * @public
     * @method getArticles
     * @returns {Article[]}
     */
    getArticles() {
        return (this.entity.articles || []).map((item) => new ArticleEntity(item));
    }

    /**
     * @public
     * @method getCategories
     * @returns {Category[]}
     */
    getCategories() {
        return (this.entity.categories || []).map((item) => new CategoryEntity(item));
    }
}

export default Blog;
