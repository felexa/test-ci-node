const path = require("path");
const webpack = require("webpack");
const withCSS = require("@zeit/next-css");
// eslint-disable-next-line no-unused-vars
const withSass = require("@zeit/next-sass");
const withFonts = require("next-fonts");
const withBundleAnalyzer = require("@next/bundle-analyzer");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["swiper", "dom7"]);
const withSourceMaps = require("@zeit/next-source-maps");
// const styledJSX = require('styled-jsx/webpack');

const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {
    uk: "uk"
};

module.exports = withPlugins(
    [
        withBundleAnalyzer({
            enabled: process.env.ANALYZE === "true"
        }),
        withFonts,
        withCSS,
        withSass,
        withTM,
        withSourceMaps
    ],
    {
        trailingSlash: true,
        poweredByHeader: false,
        useFileSystemPublicRoutes: false,
        enableSvg: true, // withFonts
        compress: false,
        serverRuntimeConfig: {
            // Will only be available on the server side
            // mySecret: 'secret',
        },
        rewrites: async () => nextI18NextRewrites(localeSubpaths),
        publicRuntimeConfig: {
            getPublicHost: process.env.NEXT_PUBLIC_HOST,
            getCDNHost: process.env.NEXT_PUBLIC_CDN_HOST,
            getBucketName: process.env.NEXT_PUBLIC_BUCKET_NAME,
            getStaticResourcesHost: process.env.NEXT_PUBLIC_STATIC_RESOURCES_HOST,
            getBitrixHost: process.env.NEXT_PUBLIC_BITRIX_HOST,
            getBitrixApiHost: process.env.NEXT_PUBLIC_API_BITRIX_HOST,
            getCookieHost: process.env.NEXT_PUBLIC_COOKIE_HOST,
            getBasketServiceHost: process.env.NEXT_PUBLIC_BASKET_SERVICE_HOST,
            getCatalogServiceHost: process.env.NEXT_PUBLIC_CATALOG_SERVICE_HOST,
            getCheckoutServiceHost: process.env.NEXT_PUBLIC_CHECKOUT_SERVICE_HOST,
            getReviewServiceHost: process.env.NEXT_PUBLIC_REVIEW_SERVICE_HOST,
            getInfoBlockServiceHost: process.env.NEXT_PUBLIC_INFO_BLOCK_SERVICE_HOST,
            getMetaServiceHost: process.env.NEXT_PUBLIC_META_SERVICE_HOST,
            getHttpClientRequestTimeout: process.env.NEXT_PUBLIC_REQUEST_TIMEOUT,
            getScriptsLoadTimeout: process.env.NEXT_PUBLIC_SCRIPTS_LOAD_TIMEOUT,
            getCSSLoadDelay: process.env.NEXT_PUBLIC_CSS_LOAD_DELAY,
            getHomePageServiceHost: process.env.NEXT_PUBLIC_HOMEPAGE_SERVICE_HOST,
            getAuthorizationServiceHost: process.env.NEXT_PUBLIC_AUTHORIZATION_SERVICE_HOST,
            getSearchServiceHost: process.env.NEXT_SEARCH_SERVICE_HOST,
            getBlogServiceHost: process.env.NEXT_PUBLIC_BLOG_SERVICE_HOST,
            getMediaServiceHost: process.env.NEXT_PUBLIC_MEDIA_SERVICE_HOST
        },
        assetPrefix: process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_STATIC_RESOURCES_HOST : "",
        webpack(config) {
            config.module.rules.push(
                {
                    test: /\.[s]css$/,
                    use: [
                        // defaultLoaders.babel,
                        // {
                        //     // eslint-disable-next-line global-require
                        //     loader: styledJSX.loader,
                        //     options: {
                        //         type: "global"
                        //     }
                        // },
                        {
                            loader: "sass-loader"
                            // options: {
                            //     webpackImporter: true
                            // }
                        }
                    ]
                }
            );

            config.module.rules.push({
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: "url-loader"
                }
            });

            config.module.rules.push({
                test: /\.txt$/,
                use: "raw-loader"
            });

            Object.assign(config.resolve.alias, {
                app: path.resolve(__dirname, "./src"),
                desktop: path.resolve(__dirname, "./src/desktop"),
                components: path.resolve(__dirname, "./src/desktop/components"),
                config: path.resolve(__dirname, "./src/config"),
                pages: path.resolve(__dirname, "./src/pages"),
                styles: path.resolve(__dirname, "./src/styles")
            });

            config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

            return config;
        }
    }
);
