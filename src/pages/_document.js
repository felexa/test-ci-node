import React from "react";
import Document, {Html, Main, NextScript} from "next/document";

import Analytics from "app/core/analytics";
import DeviceDetector from "app/core/utilites/deviceDetector";

import Env from "app/core/environment";

import HeadCustom from "app/desktop/components/headCustom/HeadCustom";

class CustomDocument extends Document {
    constructor(props) {
        super(props);

        this.env = Env.getInstance();

        this.analytics = Analytics.getInstance();
        this.deviceDetector = DeviceDetector.getInstance();
    }

    /**
     * @private
     * @method _isProduction
     * @returns {boolean}
     */
    _isProduction() {
        return process.env.NODE_ENV === "production";
    }

    /**
     * @method _getURLForLazyLoad
     * @return {string}
     * @private
     */
    _getURLForLazyLoad() {
        return `${this.env.getStaticResourcesHost()}/lazy.js`;
    }

    /**
     * @private
     * @method _getAntiFlickerScript
     * @returns {string}
     */
    _getAntiFlickerScript() {
        return `
            (function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
            h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
            (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
            })(window,document.documentElement,'async-hide','dataLayer',4000,
            {'CONTAINER_ID':true});
        `;
    }

    /**
     * @private
     * @method _getScripts
     * @returns {string}
     */
    _getScripts() {
        return this._isProduction() && this.deviceDetector.isGooglePagespeed() ? "" : <NextScript />;
    }

    render() {
        return (
            <Html>
                <HeadCustom />

                <body>
                    <Main />

                    {this._getScripts()}

                    <script
                        src={this._getURLForLazyLoad()}
                        async
                    />

                    <script
                        src={`https://cdn.lenmit.com/static/js/retag.js?r=${new Date().getDate()}`}
                        id="admitad-retag"
                        async
                    />

                    {/*<script*/}
                    {/*    dangerouslySetInnerHTML={{__html: this._getAntiFlickerScript()}}*/}
                    {/*/>*/}

                    {this.analytics.getEsputnik().getScript()}
                </body>
            </Html>
        );
    }
}

CustomDocument.getInitialProps = async function (ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return {...initialProps};
};

export default CustomDocument;
