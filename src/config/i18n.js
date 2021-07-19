// const NextI18Next = require("next-i18next").default;
//
// module.exports = new NextI18Next({
//     defaultLanguage: "ru",
//     fallbackLng: "ru",
//     lng: "ru",
//     otherLanguages: ["ua"],
//     localeSubpaths: {
//         ua: "ua"
//     },
//     localePath: typeof window === "undefined" ? "public/locales" : "locales",
//     serverLanguageDetection: false,
//     browserLanguageDetection: false
// });

const NextI18Next = require('next-i18next').default;
const path = require('path');

module.exports = new NextI18Next({
    defaultLanguage: "ru",
    otherLanguages: ["uk"],
    fallbackLng: "ru",
    // localeSubpaths: {
    //     uk: "uk"
    // },
    detection: {
        order: ['path', 'subdomain'],
        // order: ['path', 'subdomain', 'cookie'],
        cookieSameSite: '',
        cookieDomain: '.apteka24.ua',
        caches: ['cookie'],
        lookupCookie: 'i18next',
        lookupFromPathIndex: 0,
        lookupFromSubdomainIndex: 0
    },
    ignoreRoutes: [],
    localePath: path.resolve('./public/static/locales'),
    shallowRender: true,
    serverLanguageDetection: true,
    browserLanguageDetection: false
});
