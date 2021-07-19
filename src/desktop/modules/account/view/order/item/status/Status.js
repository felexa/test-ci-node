import Enum from "app/core/utilites/enum/order/status";

import BaseStatus from "desktop/components/status/Status";

class Status extends BaseStatus {
    constructor(props) {
        super(props);

        this.statusEnum = Enum.getInstance();

        this.icons = {
            [this.statusEnum.getNewOrderAsValue()]: "icon-clock",
            [this.statusEnum.getInProgressAsValue()]: "icon-clock",
            [this.statusEnum.getInTransitToDrugstoreAsValue()]: "icon-clock",
            [this.statusEnum.getArrivedAtTheDrugstoreAsValue()]: "icon-clock",
            [this.statusEnum.getCompletedAsValue()]: "icon-done",
            [this.statusEnum.getCanceledAsValue()]: "icon-close-small"
        };
    }
}

export default Status;
