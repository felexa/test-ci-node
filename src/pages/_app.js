import _ from "lodash";
import {isNode} from "browser-or-node";

import React from "react";
import App from "next/app";
import Head from "next/head";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Env from "app/core/environment";

import LanguageEnum from "app/core/utilites/enum/language";

import DeviceDetector from "app/core/utilites/deviceDetector";
import Router from "app/core/utilites/router";

import Analytics from "app/core/analytics";
import MetaTagService from "app/core/services/metaTag";

import PromoBanner from "app/core/services/promoBanner";

import {appWithTranslation} from "config/i18n";

import "a24-style-guide/dist/css/main.css";

// import "styles/style.scss";
import styles from "styles/style.module.scss";

// @appWithTranslation
class Apteka24 extends App {
    constructor(props) {
        super(props);

        this.env = Env.getInstance();
        this.router = Router.getInstance();
        this.analytics = Analytics.getInstance();

        DeviceDetector.getInstance().init(props.userAgent);
    }

    /**
     * @protected
     * @method componentDidMount
     * @returns {void}
     */
    componentDidMount() {
        this.analytics.init();

        if (window.location.pathname !== this.props.pageInfo.url) {
            this.router.replace(this.props.pageInfo.url, {
                shallow: true
            });
        }
    }

    /**
     * @private
     * @method getMetaData
     * @returns {Object}
     */
    getMetaData() {
        return this.props.pageInfo.metadata || {};
    }

    /**
     * @private
     * @method getMetaTags
     * @returns {Object}
     */
    getMetaTags() {
        return this.getMetaData().meta || [];
    }

    /**
     * @private
     * @method getMetaLinks
     * @returns {Array}
     */
    getMetaLinks() {
        return this.getMetaData().links || [];
    }

    /**
     * @private
     * @method getTitle
     * @returns {string}
     */
    getTitle() {
        return this.getMetaData().title || "";
    }

    /**
     * @private
     * @method getDescription
     * @returns {string}
     */
    getDescription() {
        let description = this.getMetaTags().find((tag) => tag.name === "description");

        return description ? description.content : "";
    }

    /**
     * @private
     * @method renderMetaTags
     * @returns {Array}
     */
    renderMetaTags() {
        return this.getMetaTags().map(function (item, index) {
            return <meta key={`meta-${index}`} {...item} />;
        });
    }

    /**
     * @private
     * @method renderLinks
     * @returns {Array}
     */
    renderLinks() {
        return this.getMetaLinks().map(function (item, index) {
            return <link key={`link-${index}`} {...item} />;
        });
    }

    /**
     * TODO: need to refactoring
     *
     *
     *
     * @private
     * @method getProductName
     * @returns {string}
     */
    getProductName() {
        return _.get(this.props, "pageProps.initialData.product.name", "") || "";
    }

    /**
     * @private
     * @method getCurrentUrl
     * @returns {URL}
     */
    getCurrentUrl() {
        return new URL(this.props.currentUrl);
    }

    /**
     * @private
     * @method buildUrlForGetCookie
     * @returns {string}
     */
    buildUrlForGetCookie() {
        return `${this.env.getCookieHost()}/get_cookie.php${this.getCurrentUrl().search}`;
    }

    /**
     * @public
     * @method render
     * @returns {string}
     */
    render() {
        let {
            Component, hasError, pageProps, pageInfo
        } = this.props;

        _.merge(pageInfo, {
            metadata: {
                description: this.getDescription()
            }
        });

        return (
            <>
                <Head>
                    <title>{this.getTitle()}</title>

                    <meta charSet="UTF-8" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />

                    <link rel="manifest" href="/manifest.json" />

                    {/*<link*/}
                    {/*    rel="preload"*/}
                    {/*    href={PromoBanner.getInstance().getPromoBanner().preview.mobile.original}*/}
                    {/*    as="image"*/}
                    {/*/>*/}

                    {this.renderMetaTags()}
                    {this.renderLinks()}
                </Head>

                <img className="d-none" src={this.buildUrlForGetCookie()} alt="" />

                <style jsx>
                    {styles}
                </style>

                <Component hasError={hasError} {...pageProps} pageInfo={pageInfo} />
            </>
        );
    }
}

/**
 * @static
 * @method getCurrentUrlByContext
 * @param context {Object}
 * @returns {string}
 */
Apteka24.getCurrentUrlByContext = function (context) {
    return `${Env.getInstance().getBitrixHost()}${context.asPath}`;
};

/**
 * @static
 * @method getCurrentUrlByContext
 * @param context {Object}
 * @returns {string}
 */
Apteka24.getLanguageByContext = function (context) {
    return (context.req && context.req.language) || context.query.subpath || LanguageEnum.getInstance().getRuAsValue();
};

/**
 * @example
 *
 * redirect = {
 *  url: string,
 *  statusCode: number
 * }
 *
 * @static
 * @method redirectTo
 * @param response {Object}
 * @param redirect {Object}
 * @returns {void}
 */
Apteka24.redirectTo = function (response, redirect) {
    if (isNode) {
        response.redirect(redirect.statusCode, redirect.url);
    } else {
        window.location.href = redirect.url;
    }
};

/**
 * @property
 * @type {string[]}
 */
Apteka24.ignoredURL = [
    "/json",
    "/uk/json",
    "/favicon.ico",
    "/uk/favicon.ico"
];

/**
 * @static
 * @method getInitialProps
 * @param params {Object}
 * @returns {Promise}
 */
Apteka24.getInitialProps = function (params) {
    let {Component, ctx} = params,
        props = {
            currentUrl: isNode ? `${ctx.req.protocol}://${ctx.req.hostname}${ctx.req.url}` : window.location.href,
            hasError: false,
            pageInfo: {
                language: ""
            },
            pageProps: {
                breadcrumbs: [],
                initialData: {},
                promoBanner: PromoBanner.getInstance().getPromoBanner()
            },
            namespacesRequired: ["common"],
            userAgent: isNode ? ctx.req.headers["user-agent"] : window.navigator.userAgent
        };

    if (isNode && Apteka24.ignoredURL.includes(ctx.req.url)) { //@TODO temporary hook !
        ctx.res.statusCode = 404;

        return Promise.resolve(props);
    }

    ctx.language = Apteka24.getLanguageByContext(ctx);

    return new Promise((resolve) => {
        MetaTagService.getInstance().getMetaTags(
            Apteka24.getCurrentUrlByContext(ctx),
            ctx.language,
            function (pageInfo) {
                if (pageInfo.redirect && pageInfo.redirect.url) {
                    Apteka24.redirectTo(ctx.res, pageInfo.redirect);
                } else {
                    props.pageInfo = pageInfo;
                    props.pageInfo.language = ctx.language;
                    props.pageProps.breadcrumbs = pageInfo.breadcrumbs;
                    props.pageProps.initialData = pageInfo.data || {};

                    resolve(pageInfo);
                }
            },
            function () {
                props.pageInfo = {
                    language: ctx.language
                };

                // return resolve({});

                // eslint-disable-next-line no-unreachable
                props.hasError = true;

                props.pageInfo = {
                    language: ctx.language,
                    metadata: {
                        title: "Ошибка 404 - страница не найдена | Аптека24",
                        meta: []
                    }
                };

                if (isNode) {
                    ctx.res.statusCode = 404;
                }

                resolve(props.pageInfo);
            }
        );
    }).then(() => new Promise((resolve) => {
        Promise.resolve(Component.getInitialProps(ctx, props)).then((initialData) => {
            props.pageProps.initialData = _.merge({}, initialData, props.pageProps.initialData);

            resolve(props);
        });
    }));
};

export default appWithTranslation(Apteka24);
