import Rubric from "app/core/entities/rubric/Rubric";
import Product from "app/core/entities/product/Product";

class ProductRubric extends Rubric {
    /**
     * @method getItems
     * @return {Product[]}
     */
    getItems() {
        return (this.entity.items || []).map((item) => new Product(item));
    }
}

export default ProductRubric;
