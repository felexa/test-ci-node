import Rubric from "app/core/entities/rubric/Rubric";
import Article from "app/core/entities/blog/Article";

class BlogRubric extends Rubric {
    /**
     * @method getItems
     * @return {Article[]}
     */
    getItems() {
        let items = this.entity.items || [];

        return (Array.isArray(items) && items).map((item) => new Article(item));
    }
}

export default BlogRubric;
