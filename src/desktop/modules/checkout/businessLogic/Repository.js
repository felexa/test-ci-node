class Repository {
    /**
     * @method getOrder
     * @returns {{items: []}}
     */
    getOrder(success) {
        success({
            items: [
                {
                    type: "default product order",
                    items: [
                        {
                            id: 0,
                            url: "/test-url",
                            name: "ZORAT WHEELS ZW-2788 MK-P R16 W7 PCD5X112 ET42 DIA66.6 MATT DARK GREY POLISHED",
                            preview: {
                                sizes: {
                                    medium: "https://i1.rozetka.ua/goods/12109959/35712488_images_12109959988.jpg",
                                    original: "https://i1.rozetka.ua/goods/12109959/35712488_images_12109959988.jpg",
                                    small: "https://i1.rozetka.ua/goods/12109959/35712488_images_12109959988.jpg"
                                },
                                src: "https://i1.rozetka.ua/goods/12109959/35712488_images_12109959988.jpg",
                                alt: "ZORAT WHEELS ZW-2788 MK-P R16 W7 PCD5X112 ET42 DIA66.6 MATT DARK GREY POLISHED",
                                title: "ZORAT WHEELS ZW-2788 MK-P R16 W7 PCD5X112 ET42 DIA66.6 MATT DARK GREY POLISHED"
                            },
                            prices: {
                                current: 2251,
                                old: 0,
                                blackFriday: 0,
                                forStaff: 0
                            },
                            count: 1
                        }
                    ]
                },
                {
                    type: "default product order",
                    items: [
                        {
                            id: 1,
                            url: "/test-url-2",
                            name: "ZORAT WHEELS ZW-2788 MK-P R16 W7 PCD5X112 ET42 DIA66.6 MATT DARK GREY POLISHED",
                            preview: {
                                sizes: {
                                    medium: "https://i1.rozetka.ua/goods/12109959/35712488_images_12109959988.jpg",
                                    original: "https://i1.rozetka.ua/goods/12109959/35712488_images_12109959988.jpg",
                                    small: "https://i1.rozetka.ua/goods/12109959/35712488_images_12109959988.jpg"
                                },
                                src: "https://i1.rozetka.ua/goods/12109959/35712488_images_12109959988.jpg",
                                alt: "ZORAT WHEELS ZW-2788 MK-P R16 W7 PCD5X112 ET42 DIA66.6 MATT DARK GREY POLISHED",
                                title: "ZORAT WHEELS ZW-2788 MK-P R16 W7 PCD5X112 ET42 DIA66.6 MATT DARK GREY POLISHED"
                            },
                            prices: {
                                current: 3851,
                                old: 0,
                                blackFriday: 0,
                                forStaff: 0
                            },
                            count: 1
                        }
                    ]
                }
            ]
        });

        return this;
    }

    /**
     * @method getPopularCities
     * @param success {Function}
     * @param error {Function}
     * @returns {Repository}
     */
    // eslint-disable-next-line no-unused-vars
    getPopularCities(success, error) {
        setTimeout(function () {
            success([
                {
                    id: 3160,
                    name: "\u041a\u0438\u0435\u0432",
                    name_ru: "\u041a\u0438\u0435\u0432"
                },
                {
                    id: 4074,
                    name: "\u041e\u0434\u0435\u0441\u0441\u0430",
                    name_ru: "\u041e\u0434\u0435\u0441\u0441\u0430"
                },
                {
                    id: 4473,
                    name: "\u0425\u0430\u0440\u044c\u043a\u043e\u0432",
                    name_ru: "\u0425\u0430\u0440\u044c\u043a\u043e\u0432"
                },
                {
                    id: 3532,
                    name: "\u0414\u043d\u0435\u043f\u0440",
                    name_ru: "\u0414\u043d\u0435\u043f\u0440"
                },
                {
                    id: 3873,
                    name: "\u041b\u044c\u0432\u043e\u0432",
                    name_ru: "\u041b\u044c\u0432\u043e\u0432"
                }
            ]);
        }, 3000);

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
        success();
        console.log("createPreOrder");

        return this;
    }
}

export default Repository;
