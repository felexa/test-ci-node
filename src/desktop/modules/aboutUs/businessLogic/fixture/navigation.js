/* eslint-disable max-len */
import PageTypesEnum from "app/core/utilites/enum/about/pages";
import LanguageEnum from "app/core/utilites/enum/language";

let pageTypes = PageTypesEnum.getInstance(),
    languages = LanguageEnum.getInstance();

export default {
    ru: [
        {
            title: "О компании",
            url: `/${pageTypes.getMainAsValue()}/`,
            id: pageTypes.getMainAsValue()
        },
        {
            title: "Как мы работаем",
            url: `/${pageTypes.getHowWeWorkAsValue()}/`,
            id: pageTypes.getHowWeWorkAsValue()
        },
        {
            title: "Как сделать заказ",
            url: `/${pageTypes.getMainAsValue()}/${pageTypes.getHowToAsValue()}/`,
            id: pageTypes.getHowToAsValue()
        },
        {
            title: "Доставка и оплата",
            url: `/${pageTypes.getMainAsValue()}/${pageTypes.getDeliveryAsValue()}/`,
            id: pageTypes.getDeliveryAsValue(),
            subItems: [
                {}
            ]
        },
        {
            title: "Социальные программы",
            url: `/${pageTypes.getSocialAsValue()}/`,
            id: pageTypes.getSocialAsValue()
        },
        {
            title: "Отзывы",
            url: `/${pageTypes.getMainAsValue()}/${pageTypes.getReviewsAsValue()}/`,
            id: pageTypes.getReviewsAsValue()
        },
        {
            title: "Контакты",
            url: `/${pageTypes.getMainAsValue()}/${pageTypes.getContactsAsValue()}/`,
            id: pageTypes.getContactsAsValue()
        },
        {
            title: "Наша миссия",
            url: `/${pageTypes.getMainAsValue()}/${pageTypes.getMissionAsValue()}/`,
            id: pageTypes.getMissionAsValue()
        },
        {
            title: "Наши партнёры",
            url: `/${pageTypes.getMainAsValue()}/${pageTypes.getPartnersAsValue()}/`,
            id: pageTypes.getPartnersAsValue()
        },
        {
            title: "Наша команда",
            url: `/${pageTypes.getTeamAsValue()}/`,
            id: pageTypes.getTeamAsValue()
        },
        {
            title: "Медицинские эксперты",
            url: `/${pageTypes.getTeamAsValue()}/${pageTypes.getMedicalExpertsAsValue()}/`,
            id: pageTypes.getMedicalExpertsAsValue()
        },
        {
            title: "Редакционная политика",
            url: `/${pageTypes.getEditorialPolicyAsValue()}/`,
            id: pageTypes.getEditorialPolicyAsValue()
        },
        {
            title: "Маркетинговая политика",
            url: `/${pageTypes.getMainAsValue()}/${pageTypes.getMarketingPolicyAsValue()}/`,
            id: pageTypes.getMarketingPolicyAsValue()
        },
        {
            title: "Политика публикации отзывов",
            url: `/${pageTypes.getMainAsValue()}/${pageTypes.getPublishingPolicyAsValue()}/`,
            id: pageTypes.getPublishingPolicyAsValue()
        },
        {
            title: "СМИ о нас",
            url: `/${pageTypes.getMassMediaAsValue()}/`,
            id: pageTypes.getMassMediaAsValue()
        },
        {
            title: "Политика конфиденциальности",
            url: `/${pageTypes.getTermsAsValue()}/`,
            id: pageTypes.getTermsAsValue()
        },
        {
            title: "Соглашение об использовании",
            url: `/${pageTypes.getAgreementAsValue()}/`,
            id: pageTypes.getAgreementAsValue()
        },
        {
            title: "Условия возврата",
            url: `/${pageTypes.getOrderReturnAsValue()}/`,
            id: pageTypes.getOrderReturnAsValue()
        },
        {
            title: "Гарантии качества",
            url: `/${pageTypes.getMainAsValue()}/${pageTypes.getWarrantyAsValue()}/`,
            id: pageTypes.getWarrantyAsValue()
        },
        {
            title: "Правила участия в программе лояльности",
            url: `/${pageTypes.getLoyaltyRulesAsValue()}/`,
            id: pageTypes.getLoyaltyRulesAsValue()
        },
        {
            title: "Правила начисления и списания бонусов",
            url: `/${pageTypes.getLoyaltyBonusRulesAsValue()}/`,
            id: pageTypes.getLoyaltyBonusRulesAsValue()
        }
    ],
    uk: [
        {
            title: "Про компанію",
            url: `/${languages.getUaAsValue()}/${pageTypes.getMainAsValue()}/`,
            id: pageTypes.getMainAsValue()
        },
        {
            title: "Як ми працюємо",
            url: `/${pageTypes.getHowWeWorkAsValue()}/`,
            id: pageTypes.getHowWeWorkAsValue()
        },
        {
            title: "Як зробити замовлення",
            url: `/${languages.getUaAsValue()}/${pageTypes.getMainAsValue()}/${pageTypes.getHowToAsValue()}/`,
            id: pageTypes.getHowToAsValue()
        },
        {
            title: "Доставка і оплата",
            url: `/${languages.getUaAsValue()}/${pageTypes.getMainAsValue()}/${pageTypes.getDeliveryAsValue()}/`,
            id: pageTypes.getDeliveryAsValue(),
            subItems: [
                {}
            ]
        },
        {
            title: "Соціальні програми",
            url: `/${pageTypes.getSocialAsValue()}/`,
            id: pageTypes.getSocialAsValue()
        },
        {
            title: "Відгуки",
            url: `/${pageTypes.getMainAsValue()}/${pageTypes.getReviewsAsValue()}/`,
            id: pageTypes.getReviewsAsValue()
        },
        {
            title: "Контакти",
            url: `/${languages.getUaAsValue()}/${pageTypes.getMainAsValue()}/${pageTypes.getContactsAsValue()}/`,
            id: pageTypes.getContactsAsValue()
        },
        {
            title: "Наша місія",
            url: `/${languages.getUaAsValue()}/${pageTypes.getMainAsValue()}/${pageTypes.getMissionAsValue()}/`,
            id: pageTypes.getMissionAsValue()
        },
        {
            title: "Наші партнери",
            url: `/${languages.getUaAsValue()}/${pageTypes.getMainAsValue()}/${pageTypes.getPartnersAsValue()}/`,
            id: pageTypes.getPartnersAsValue()
        },
        {
            title: "Наша команда",
            url: `/${pageTypes.getTeamAsValue()}/`,
            id: pageTypes.getTeamAsValue()
        },
        {
            title: "Медичні експерти",
            url: `/${pageTypes.getTeamAsValue()}/${pageTypes.getMedicalExpertsAsValue()}/`,
            id: pageTypes.getMedicalExpertsAsValue()
        },
        {
            title: "Редакційна політика",
            url: `/${languages.getUaAsValue()}/${pageTypes.getEditorialPolicyAsValue()}/`,
            id: pageTypes.getEditorialPolicyAsValue()
        },
        {
            title: "Маркетингова політика",
            url: `/${languages.getUaAsValue()}/${pageTypes.getMainAsValue()}/${pageTypes.getMarketingPolicyAsValue()}/`,
            id: pageTypes.getMarketingPolicyAsValue()
        },
        {
            title: "Політика публікації відгуків",
            url: `/${languages.getUaAsValue()}/${pageTypes.getMainAsValue()}/${pageTypes.getPublishingPolicyAsValue()}/`,
            id: pageTypes.getPublishingPolicyAsValue()
        },
        {
            title: "ЗМІ про нас",
            url: `/${languages.getUaAsValue()}/${pageTypes.getMassMediaAsValue()}/`,
            id: pageTypes.getMassMediaAsValue()
        },
        {
            title: "Політика конфіденційності",
            url: `/${languages.getUaAsValue()}/${pageTypes.getTermsAsValue()}/`,
            id: pageTypes.getTermsAsValue()
        },
        {
            title: "Угода про використання",
            url: `/${languages.getUaAsValue()}/${pageTypes.getAgreementAsValue()}/`,
            id: pageTypes.getAgreementAsValue()
        },
        {
            title: "Умови повернення",
            url: `/${languages.getUaAsValue()}/${pageTypes.getOrderReturnAsValue()}/`,
            id: pageTypes.getOrderReturnAsValue()
        },
        {
            title: "Гарантії якості",
            url: `/${languages.getUaAsValue()}/${pageTypes.getMainAsValue()}/${pageTypes.getWarrantyAsValue()}/`,
            id: pageTypes.getWarrantyAsValue()
        },
        {
            title: "Правила участі у програмі лояльності",
            url: `/${pageTypes.getLoyaltyRulesAsValue()}/`,
            id: pageTypes.getLoyaltyRulesAsValue()
        },
        {
            title: "Правила нарахування та списання бонусів",
            url: `/${pageTypes.getLoyaltyBonusRulesAsValue()}/`,
            id: pageTypes.getLoyaltyBonusRulesAsValue()
        }
    ]
};
