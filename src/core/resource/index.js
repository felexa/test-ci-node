import Env from "app/core/environment";
import LanguageEnum from "app/core/utilites/enum/language";
import AccountSectionEnum from "app/core/utilites/enum/account/section";
import RouteNameEnum from "app/core/utilites/enum/route";

import Router from "app/core/utilites/router";

import NavigationItemEntity from "app/core/entities/navigation/Navigation";

import stringsRU from "./strings/ru";
import stringsUA from "./strings/ua";
import htmlRU from "./html/ru";
import htmlUA from "./html/ua";
import links from "./links";

import AccountNavigation from "./account/navigation/Navigation";
import MobileNavigation from "./mobileNavigation/MobileNavigation";
import FooterNavigation from "./footerNavigation/FooterNavigation";

import Resource from "./Resource";

let languageEnum = LanguageEnum.getInstance();
// resource = null;

function getStringsResource(lang) {
    return languageEnum.isRu(lang) ? stringsRU : stringsUA;
}

function getHTMLResource(lang) {
    return languageEnum.isRu(lang) ? htmlRU : htmlUA;
}

// function createResource(lang) {
//     let result = null;
//
//     if (!resource) {
//         result = new Resource({
//             resources: {
//                 mobileNavigation: new MobileNavigation({
//                     strings: getStringsResource(lang),
//                     env: Env.getInstance()
//                 }),
//                 footerNavigation: new FooterNavigation({
//                     strings: getStringsResource(lang),
//                     html: getHTMLResource(lang),
//                     links
//                 }),
//                 account: {
//                     navigation: new AccountNavigation({
//                         strings: getStringsResource(lang),
//                         NavigationItemEntity,
//                         env: Env.getInstance(),
//                         router: Router.getInstance(),
//                         accountSectionEnum: AccountSectionEnum.getInstance(),
//                         routeNameEnum: RouteNameEnum.getInstance()
//                     })
//                 }
//             }
//         });
//
//         resource = result;
//     } else {
//         result = resource;
//     }
//
//     return result;
// }

function createResource(lang) {
    return new Resource({
        resources: {
            mobileNavigation: new MobileNavigation({
                strings: getStringsResource(lang),
                env: Env.getInstance(),
                links
            }),
            footerNavigation: new FooterNavigation({
                strings: getStringsResource(lang),
                html: getHTMLResource(lang),
                links
            }),
            account: {
                navigation: new AccountNavigation({
                    strings: getStringsResource(lang),
                    NavigationItemEntity,
                    env: Env.getInstance(),
                    router: Router.getInstance(),
                    accountSectionEnum: AccountSectionEnum.getInstance(),
                    routeNameEnum: RouteNameEnum.getInstance(),
                    links
                })
            }
        }
    });
}

export default {
    get lang() {
        return languageEnum.getRuAsValue();
    },
    get strings() {
        return getStringsResource(this.lang);
    },
    get links() {
        return links;
    },
    get html() {
        return getHTMLResource(this.lang);
    },
    /**
     * @method _getLanguage
     * @param lang {string}
     * @returns {string}
     * @private
     */
    _getLanguage(lang) {
        return languageEnum.hasValue(lang) ? lang : this.lang;
    },
    /**
     * @public
     * @method getStrings
     * @param [lang] {string}
     * @returns {Object}
     */
    getStrings(lang) {
        return getStringsResource(this._getLanguage(lang));
    },
    /**
     * @public
     * @method getHTML
     * @param [lang] {string}
     * @returns {Object}
     */
    getHTML(lang) {
        return getHTMLResource(this._getLanguage(lang));
    },
    /**
     * @description
     * don't use this method
     *
     * @deprecated
     * @public
     * @method setLanguage
     * @param lang {string}
     * @returns {Object}
     */
    // eslint-disable-next-line no-unused-vars
    setLanguage(lang) {
        // this.lang = languageEnum.hasValue(lang) ? lang : this.lang;

        return this;
    },
    /**
     * @public
     * @method getInstance
     * @param [lang] {string}
     * @returns {Resource}
     */
    getInstance(lang) {
        return createResource(this._getLanguage(lang));
    }
};
