import Enum from "app/core/utilites/enum/Enum";

let componentClassNameEnum = new Enum({
    fields: [
        {key: "authorizationModal", value: "authorization-modal"},
        {key: "employeeInviteCompletedModal", value: "employee-invite-completed-modal"},
        {key: "employeeInviteFailureModal", value: "employee-invite-failure-modal"},
        {key: "welcomeBonusModal", value: "welcome-bonus-modal"}
    ]
});

export default {
    getInstance() {
        return componentClassNameEnum;
    }
};
