import Entity from "app/core/entities/Entity";
import Profile from "app/core/entities/profile/Profile";

class FAQ extends Entity {
    /**
     * @public
     * @method getQuestion
     * @returns {string}
     */
    getQuestion() {
        return this.entity.name || "";
    }

    /**
     * @public
     * @method getAnswer
     * @returns {string}
     */
    getAnswer() {
        return this.entity.text || "";
    }

    /**
     * @public
     * @method getShortAnswer
     * @returns {string}
     */
    getShortAnswer() {
        return this.entity.announce || "";
    }

    /**
     * @public
     * @method getSourceLinks
     * @returns {Array}
     */
    getSourceLinks() {
        let sourceLinks = this.entity.sourceLinks;

        return ((Array.isArray(sourceLinks) && sourceLinks) || []).map((item) => ({
            getUrl: () => item.url || '',
            getTitle: () => item.title || ''
        }));
    }

    /**
     * @public
     * @method getRelatedQuestions
     * @returns {Array}
     */
    getRelatedQuestions() {
        let relatedQuestions = this.entity.relativeQuestions;

        return ((Array.isArray(relatedQuestions) && relatedQuestions) || []).map((item) => ({
            getId: () => item.id || "",
            getAlias: () => item.code || "",
            getQuestion: () => item.name || "",
            getUpdatedAt: () => item.date || ""
        }));
    }

    /**
     * @public
     * @method getAlias
     * @returns {string}
     */
    getAlias() {
        return this.entity.code || "";
    }

    /**
     * @public
     * @method getRedactor
     * @returns {Profile}
     */
    getRedactor() {
        return new Profile(this.entity.redactor);
    }

    /**
     * @public
     * @method getCensor
     * @returns {Profile}
     */
    getCensor() {
        return new Profile(this.entity.censor);
    }

    /**
     * @public
     * @method getUpdatedAt
     * @returns {string}
     */
    getUpdatedAt() {
        return this.entity.date || "";
    }
}

export default FAQ;
