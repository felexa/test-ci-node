import Entity from "app/core/entities/Entity";
import Transaction from "./Transaction";

class Bonus extends Entity {
    /**
     * @method hasBonus
     * @return {boolean}
     */
    hasBonus() {
        return Boolean(this.getTotalAvailableCount());
    }

    /**
     * @method getTotalAvailableCount
     * @return {number}
     */
    getTotalAvailableCount() {
        return Number(this.entity.bonusPointsDetails && this.entity.bonusPointsDetails.available.amount) || 0;
    }

    /**
     * @method getTransactions
     * @return {Transaction[]}
     */
    getTransactions() {
        return (this.entity.transactions || []).map((item) => new Transaction(item));
    }
}

export default Bonus;
