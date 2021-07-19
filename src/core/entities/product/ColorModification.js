import Entity from "app/core/entities/Entity";
import Image from "app/core/entities/image/Image";

class ColorModification extends Entity {
    getUrl() {
        return this.entity.url || "";
    }

    getColor() {
        return new Image(this.entity.color);
    }

    getName() {
        return this.entity.name || "";
    }

    isActive() {
        return Boolean(this.entity.isActive);
    }
}

export default ColorModification;
