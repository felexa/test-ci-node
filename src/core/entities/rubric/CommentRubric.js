import Rubric from "app/core/entities/rubric/Rubric";
import Thread from "app/core/entities/thread/Thread";

class CommentRubric extends Rubric {
    /**
     * @method getItems
     * @return {Thread[]}
     */
    getItems() {
        return (this.entity.items || []).map((item) => new Thread(item));
    }
}

export default CommentRubric;
