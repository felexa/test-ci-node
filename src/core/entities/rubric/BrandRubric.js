import Rubric from "app/core/entities/rubric/Rubric";
import Brand from "app/core/entities/brand/Brand";

class BrandRubric extends Rubric {
    /**
     * @method getItems
     * @return {Brand[]}
     */
    getItems() {
        return (this.entity.items || []).map((item) => new Brand(item));
    }
}

export default BrandRubric;
