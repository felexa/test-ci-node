class Order {
    constructor(order) {
        this.entity = { ...order};
    }

    getAllItems() {
        let result = [];

        this.entity.items.forEach((order) => {
            result.push(...order.items);
        });

        return result;
    }

    /**
     * @method getAllItems
     * @returns {Array}
     */
    getItems() {
        return Object.assign([], this.getAllItems());
    }
}

class User {
    constructor(user) {
        this.entity = { ...user};
    }

    getName() {
        return this.entity.name || "";
    }

    getLastName() {
        return this.entity.lastName || "";
    }

    getPhone() {
        return this.entity.phone || "";
    }
}

class Checkout {
    constructor(props) {
        this.Repository = props.dependencies.Repository;
    }

    /**
     * @method getSteps
     * @returns {Array}
     */
    getSteps() {
        return [
            // defaultStep: "contacts",
            {
                position: 1,
                name: "contacts",
                description: "Данные о покупателе",
                isAvailable: true,
                hasNext: true,
                component: null,
                dependencies: []
            },
            {
                position: 2,
                name: "delivery",
                description: "Выбор способа доставки",
                isAvailable: true,
                hasNext: true,
                component: null,
                dependencies: []
            },
            {
                position: 3,
                name: "payment",
                description: "Выбор способа оплаты",
                isAvailable: true,
                hasNext: false,
                component: null,
                dependencies: []
            },
            {
                position: 2,
                name: "order",
                description: "Выбор способов доставки и оплаты",
                isAvailable: false,
                hasNext: false,
                component: null,
                dependencies: [
                    {
                        name: "delivery",
                        component: null,
                        isAvailable: true
                    },
                    {
                        name: "payment",
                        component: null,
                        isAvailable: true
                    }
                ]
            }
        ];
    }

    /**
     * @method getOrder
     * @param success {Function}
     * @returns {Checkout}
     */
    getOrder(success) {
        this.Repository.getOrder(function (order) {
            success(new Order(order));
        });

        return this;
    }

    /**
     * @method getPopularCities
     * @param success {Function}
     * @returns {Checkout}
     */
    getPopularCities(success) {
        this.Repository.getPopularCities(function (items) {
            success(items);
        });

        return this;
    }

    /**
     * @method createPreOrder
     * @param order {Object}
     * @param success {Function}
     * @param error {Function}
     * @returns {Checkout}
     */
    // eslint-disable-next-line no-unused-vars
    createPreOrder(order, success, error) {
        this.Repository.createPreOrder(
            order,
            () => {},
            () => {}
        );

        return this;
    }

    getInitialProps() {
        return new Promise((resolve) => {
            this.Repository.getOrder(function (order) {
                setTimeout(function () {
                    resolve(order);
                }, 2000);
            });
        });
    }

    normalizeInitialProps(props) {
        return {
            order: new Order(props),
            user: new User({
                name: "Vilera",
                lastName: "Gopkaliy",
                phone: "+380636598351"
            }),
            steps: this.getSteps().filter((item) => item.isAvailable)
        };
    }
}

export default Checkout;
