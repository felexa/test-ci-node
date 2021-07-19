class MobileNavigation {
    constructor(props) {
        this.strings = props.strings;
        this.env = props.env;
        this.links = props.links;
    }

    /**
     * @public
     * @method getNavigation
     * @returns {Array}
     */
    getNavigation() {
        return [
            [
                {
                    url: this.links.howWeWork,
                    title: this.strings.howWeWork,
                    icon: "icon-question"
                },
                {
                    url: `${this.env.getBitrixHost()}/morkovki/`,
                    title: this.strings.morkovki,
                    iconUrl: `${this.links.images.yellowCarrotMini}`
                },
                {
                    url: `${this.env.getBitrixHost()}/ingredients/`,
                    title: this.strings.searchByActiveIngredient,
                    icon: "icon-substance"
                }
            ],
            [
                {
                    url: `${this.env.getBitrixHost()}/pharmacy/`,
                    title: this.strings.drugstores,
                    icon: "icon-shop"
                },
                {
                    url: `${this.env.getBitrixHost()}/about/delivery/`,
                    title: this.strings.deliveryAndPayment,
                    icon: "icon-delivery"
                },
                {
                    url: `${this.env.getBitrixHost()}/about/warranty/`,
                    title: this.strings.qualityAssurance,
                    icon: "icon-quality"
                },
                {
                    url: `${this.env.getBitrixHost()}/order-return/`,
                    title: this.strings.returnConditions,
                    icon: "icon-returns"
                },
                {
                    url: `${this.env.getBitrixHost()}/advantages/`,
                    title: this.strings.whatMakesUsDifferent,
                    icon: "icon-question"
                },
                {
                    url: `${this.env.getBitrixHost()}/about/`,
                    title: this.strings.aboutUs,
                    icon: "icon-awesome"
                },
                {
                    url: `${this.env.getBitrixHost()}/blog/`,
                    title: this.strings.blog,
                    icon: "icon-chat-dots"
                },
                {
                    url: `${this.env.getBitrixHost()}/covid-19/`,
                    title: this.strings.covid,
                    icon: "icon-microbe"
                }
            ]
        ];
    }
}

export default MobileNavigation;
