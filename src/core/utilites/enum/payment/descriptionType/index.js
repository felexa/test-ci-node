import Resource from "app/core/resource";
import Enum from "app/core/utilites/enum/Enum";

let descriptionPaymentType = new Enum({
    fields: [
        {key: "cash", value: Resource.strings.paymentTypes.cash},
        {key: "cashOnDelivery", value: Resource.strings.paymentTypes.cashOnDelivery},
        {key: "creditCardOnSite", value: Resource.strings.paymentTypes.creditCardOnSite}
    ]
});

export default {
    getInstance() {
        return descriptionPaymentType;
    }
};
