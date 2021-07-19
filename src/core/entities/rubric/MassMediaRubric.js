import Rubric from "app/core/entities/rubric/Rubric";
import Article from "app/core/entities/blog/Article";

class MassMediaRubric extends Rubric {
    /**
     * @method getItems
     * @return {Article[]}
     */
    getItems() {
        return (this.entity.items || []).map((item) => new Article(item));
    }
}

export default MassMediaRubric;
