class FooterNavigation {
    constructor(props) {
        this.strings = props.strings;
        this.html = props.html;
        this.links = props.links;
    }

    /**
     * @public
     * @method getNavigation
     * @returns {Object}
     */
    getNavigation() {
        return {
            buyer: [
                {
                    url: this.links.howWeWork,
                    name: this.strings.howWeWork
                },
                {
                    url: this.links.howTo,
                    name: this.strings.howToOrderDrugs
                },
                {
                    url: this.links.delivery,
                    name: this.strings.deliveryAndPayment
                },
                {
                    url: this.links.social,
                    name: this.strings.socialPrograms
                },
                {
                    url: this.links.reviews,
                    name: this.strings.reviews
                },
                {
                    url: this.links.blog,
                    name: this.strings.blog
                },
                {
                    url: this.links.orderReturn,
                    name: this.strings.returnConditions
                },
                {
                    url: this.links.editorialPolicy,
                    name: this.strings.editorialPolicy
                },
                {
                    url: this.links.marketingPolicy,
                    name: this.strings.marketingPolicy
                },
                {
                    url: this.links.reviewsPostingPolicy,
                    name: this.strings.reviewsPostingPolicy
                },
                {
                    url: this.links.warranty,
                    name: this.strings.qualityAssurance
                },
                {
                    url: this.links.legitimnost,
                    name: this.strings.legitimnost
                },
                {
                    url: this.links.pharmacy,
                    name: this.strings.drugstores
                },
                {
                    url: this.links.morkovki,
                    name: this.html.footer.morkovkiBeta
                },
                {
                    url: this.links.medicalAnswers,
                    name: this.strings.medicalAnswers
                },
                {
                    url: this.links.pregnancy,
                    name: this.strings.forPregnantAndBreastFeeders
                }
            ],
            company: [
                {
                    url: this.links.about,
                    name: this.strings.vendorCard.aboutCompany
                },
                {
                    url: this.links.massMedia,
                    name: this.strings.massMediaAboutUs
                },
                {
                    url: this.links.mission,
                    name: this.strings.ourMission
                },
                {
                    url: this.links.partners,
                    name: this.strings.ourPartners
                },
                {
                    url: this.links.team,
                    name: this.strings.ourTeam
                },
                {
                    url: this.links.contacts,
                    name: this.strings.contacts
                },
                {
                    url: this.links.vacancies,
                    name: this.strings.vacancies
                },
                {
                    url: this.links.medicalExperts,
                    name: this.strings.medicalExperts
                }
            ],
            partners: [
                {
                    url: this.links.contacts,
                    name: this.strings.cooperationProposals
                },
                {
                    url: this.links.partnerAccount,
                    name: this.strings.partnerAccount,
                    target: "_blank"
                }
            ]
        };
    }
}

export default FooterNavigation;
