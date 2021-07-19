import Rubric from "components/rubric/review/project/Rubric";

class ReviewRubric extends Rubric {
    constructor(props) {
        super(props);

        this.carouselConfig = {
            slidesPerView: 1,
            slideClass: "rubric__item",
            loop: false,
            spaceBetween: 10
        };
    }
}

export default ReviewRubric;
