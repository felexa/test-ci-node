import Resource from "app/core/resource";
import Enum from "app/core/utilites/enum/Enum";

let descriptionPaymentType = new Enum({
    fields: [
        {key: "courier", value: Resource.strings.deliveryTypes.courier},

        {key: "selfDelivery", value: Resource.strings.deliveryTypes.selfDelivery},

        {key: "departmentNovaPoshta", value: Resource.strings.deliveryTypes.departmentNovaPoshta},

        {key: "courierFromNovaPoshta", value: Resource.strings.deliveryTypes.courierFromNovaPoshta},

        {key: "departmentUkrPoshta", value: Resource.strings.deliveryTypes.departmentUkrPoshta},

        {key: "courierFromUrkPoshta", value: Resource.strings.deliveryTypes.courierFromUrkPoshta},

        {key: "departmentJustIn", value: Resource.strings.deliveryTypes.departmentJustIn},

        {key: "departmentMeest", value: Resource.strings.deliveryTypes.departmentMeest},

        {key: "courierFromMeest", value: Resource.strings.deliveryTypes.courierFromMeest},

        {key: "departmentiPOST", value: Resource.strings.deliveryTypes.departmentiPOST},

        {key: "courierFromiPOST", value: Resource.strings.deliveryTypes.courierFromiPOST},

        {key: "courierFromUklon", value: Resource.strings.deliveryTypes.courierFromUklon},

        {key: "withoutDelivery", value: Resource.strings.deliveryTypes.withoutDelivery}
    ]
});

export default {
    getInstance() {
        return descriptionPaymentType;
    }
};
