import Image from "app/core/entities/image/Image";
import Employee from "app/core/entities/profile/employee/Employee";

class MedicalExpert extends Employee {
    /**
     * @public
     * @method getProfileCover
     * @returns {Image}
     */
    getProfileCover() {
        return new Image(this.entity.cover);
    }

    /**
     * @public
     * @method getSocialNetworks
     * @returns {Array}
     */
    getSocialNetworks() {
        return (this.entity.links || []).map((item) => ({
            getType() {
                return item.type || "";
            },
            getTitle() {
                return item.title || "";
            },
            getUrl() {
                return item.url || "";
            }
        }));
    }

    /**
     * @public
     * @method getCetificates
     * @returns {Image[]}
     */
    getCetificates() {
        return (this.entity.certificates || []).map((item) => new Image(item));
    }

    /**
     * @public
     * @method getDateOfCreatedProfile
     * @returns {string}
     */
    getDateOfCreatedProfile() {
        return this.entity.createdAt || "";
    }

    /**
     * @public
     * @method getExpertises
     * @returns {string[]}
     */
    getExpertises() {
        return this.entity.expertises || [];
    }

    /**
     * @public
     * @method getPosition
     * @returns {string}
     */
    getPosition() {
        return this.entity.subTitle || "";
    }

    /**
     * @public
     * @method getAlias
     * @returns {string}
     */
    getAlias() {
        return this.entity.alias || "";
    }
}

export default MedicalExpert;
