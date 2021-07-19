import { merge } from "lodash";

function Store(options) {
    let defaultState = {
        components: {
            contacts: {
                name: "",
                lastName: "",
                phone: ""
            },
            delivery: {
                region: {},
                type: "1",
                department: {},
                address: {}
            },
            payment: {
                type: ""
            },
            orderBuilder: {}
        }
    };

    function reducer(state = defaultState, action) {
        let result = state;

        if (action.type === "setContacts") {
            result = merge({}, state, { components: { contacts: action.contacts } });
        }

        return result;
    }

    this.run = function () {
        options.store.reducerManager.add("newCheckout", reducer);

        return this;
    };
}

export default Store;
