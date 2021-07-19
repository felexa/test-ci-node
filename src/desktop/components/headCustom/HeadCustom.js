import React from "react";
import {Head} from "next/document";

import Env from "app/core/environment";

import CSSLink from "./CSSLink";

class HeadCustom extends Head {
    constructor(props) {
        super(props);

        this._fontResource = "https://d22bn8tviy9ll4.cloudfront.net";

        this.env = Env.getInstance();
    }

    /**
     * @method _isProductCard
     * @param context {Object}
     * @return {boolean}
     * @private
     */
    _isProductCard(context) {
        let pageControllerName = "/ProductCard";

        // eslint-disable-next-line no-underscore-dangle
        return context._documentProps.__NEXT_DATA__.page === pageControllerName;
    }

    getCssLinks() {
        let self = this,
            // eslint-disable-next-line no-underscore-dangle
            {assetPrefix, files} = this.context._documentProps,
            cssFiles = files && files.length ? files.filter((f) => /.*\.css$/.test(f)) : [];

        const cssLinkElements = [
            // <link
            //     key="icon-preload"
            //     // rel="stylesheet"
            //     rel="preload"
            //     href="https://product-qa2.z.apteka24.ua/_next/static/chunks/fonts/icomoon.c211c3f8-c211c3f81f65800bc75e7af626bbefc2.ttf"
            //     as="font"
            //     crossOrigin="anonymous"
            // />,
            // <link
            //     key="preload-img-1"
            //     // rel="stylesheet"
            //     rel="preload"
            //     href="https://s3.eu-west-1.amazonaws.com/i.apteka24.ua/products/031ecbe9-c4f2-11ea-96c2-0635d0043582-large.jpeg"
            //     as="image"
            //     crossOrigin="anonymous"
            // />,
            // <link
            //     key="preload-img-2"
            //     // rel="stylesheet"
            //     rel="preload"
            //     href="https://s3.eu-west-1.amazonaws.com/i.apteka24.ua/products/031ecbe9-c4f2-11ea-96c2-0635d0043582-small.jpeg"
            //     as="image"
            //     crossOrigin="anonymous"
            // />
        ];

        cssFiles.forEach((file) => {
            // cssLinkElements.push(
            //     <link
            //         key={`${file}-preload`}
            //         nonce={this.props.nonce}
            //         rel="preload"
            //         href={`${assetPrefix}/_next/${encodeURI(file)}`}
            //         crossOrigin={this.props.crossOrigin || process.crossOrigin}
            //     />
            // );
            //
            // cssLinkElements.push(
            //     <link
            //         key={file}
            //         nonce={this.props.nonce}
            //         rel="stylesheet"
            //         href={`${assetPrefix}/_next/${encodeURI(file)}`}
            //         crossOrigin={this.props.crossOrigin || process.crossOrigin}
            //     />
            // );

            cssLinkElements.push(
                <CSSLink
                    key={`${assetPrefix}/_next/${encodeURI(file)}`}
                    nonce={this.props.nonce}
                    crossOrigin={this.props.crossOrigin}
                    src={`${assetPrefix}/_next/${encodeURI(file)}`}
                    /* eslint-disable-next-line no-underscore-dangle */
                    async={self._isProductCard(this.context)}
                />
            );
        });

        return cssLinkElements.length === 0 ? null : cssLinkElements;
    }

    getPreloadMainLinks() {
        return [
            <link
                key={1}
                rel="preload"
                href={`${this.env.getStaticResourcesHost()}/lazy.js`}
                as="script"
            />,

            // <link
            //     key={212}
            //     rel="preload"
            //     href={`${this.env.getStaticResourcesHost()}/fonts/Roboto/300/cyrillic-300.woff2`}
            //     as="font"
            //     crossOrigin="anonymous"
            // />,
            //
            // <link
            //     key={22}
            //     rel="preload"
            //     href={`${this.env.getStaticResourcesHost()}/fonts/Roboto/300/latin-300.woff2`}
            //     as="font"
            //     crossOrigin="anonymous"
            // />,

            <link
                key={24}
                rel="preload"
                href={`${this._fontResource}/fonts/Roboto/400/latin-400.woff2`}
                as="font"
                crossOrigin="anonymous"
            />,

            <link
                key={4}
                rel="preload"
                href={`${this._fontResource}/fonts/Roboto/400/cyrillic-400.woff2`}
                as="font"
                crossOrigin="anonymous"
            />,

            <link
                key={3}
                rel="preload"
                href={`${this._fontResource}/fonts/Roboto/500/latin-500.woff2`}
                as="font"
                crossOrigin="anonymous"
            />,

            <link
                key={5}
                rel="preload"
                href={`${this._fontResource}/fonts/Roboto/500/cyrillic-500.woff2`}
                as="font"
                crossOrigin="anonymous"
            />,

            // <link
            //     key={55331}
            //     rel="preload"
            //     href={`${this.env.getStaticResourcesHost()}/fonts/Roboto/700/cyrillic-700.woff2`}
            //     as="font"
            //     crossOrigin="anonymous"
            // />,
            //
            // <link
            //     key={55221}
            //     rel="preload"
            //     href={`${this.env.getStaticResourcesHost()}/fonts/Roboto/700/latin-700.woff2`}
            //     as="font"
            //     crossOrigin="anonymous"
            // />,
            //
            // <link
            //     key={55111}
            //     rel="preload"
            //     href={`${this.env.getStaticResourcesHost()}/fonts/Roboto/700/latin-ext-700.woff2`}
            //     as="font"
            //     crossOrigin="anonymous"
            // />,
            //
            // <link
            //     key={11551}
            //     rel="preload"
            //     href={`${this.env.getStaticResourcesHost()}/fonts/Roboto/700/cyrillic-ext-700.woff2`}
            //     as="font"
            //     crossOrigin="anonymous"
            // />,

            <link
                key={6}
                rel="preload"
                // eslint-disable-next-line max-len
                href={`${this.env.getStaticResourcesHost()}/_next/static/chunks/fonts/icomoon.92a34934-92a3493425a0bb5a865b4fce00819e84.ttf`}
                as="font"
                crossOrigin="anonymous"
            />
        ];
    }

    getPreloadDynamicChunks() {
        return [];
    }
}

export default HeadCustom;
