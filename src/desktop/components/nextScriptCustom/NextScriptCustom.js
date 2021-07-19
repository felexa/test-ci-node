/* eslint-disable no-console, react/no-danger, no-underscore-dangle */
import React from "react";
import {compact, flatten} from "lodash";
import {NextScript} from "next/document";
import Env from "app/core/environment";

class NextScriptCustom extends NextScript {
    constructor(props) {
        super(props);

        this.env = Env.getInstance();

        this._isChunkedScript = this._isChunkedScript.bind(this);
    }

    /**
     * @private
     * @method _isInitialScript
     * @param script {Object}
     * @returns {boolean}
     */
    _isInitialScript(script) {
        return !script.props.src;
    }

    /**
     * @private
     * @method _isChunkedScript
     * @param script {Object}
     * @returns {boolean}
     */
    _isChunkedScript(script) {
        return !this._isInitialScript(script);
    }

    /**
     * @private
     * @method _getNextScripts
     * @returns [{props: Object, content: string}]
     */
    _getNextScripts() {
        let originalNextScripts = compact(flatten(super.render().props.children));

        return compact(
            originalNextScripts.map((child) => {
                if (child.props && child.props.id === "__NEXT_DATA__") {
                    return {
                        props: {
                            ...child.props
                        },
                        content: child.props.dangerouslySetInnerHTML.__html
                    };
                }

                if (child.type === "script") {
                    return {
                        props: {
                            ...child.props
                        },
                        content: ""
                    };
                }

                return null;
            })
        );
    }

    /**
     * @private
     * @method _getChunkedScriptsRenderer
     * @returns {Function}
     */
    _getChunkedScriptsRenderer() {
        return function (chunkedScripts, scriptsLoadTimeout) {
            setTimeout(function () {
                chunkedScripts.forEach(function (script) {
                    if (!script || !script.props) {
                        return;
                    }

                    try {
                        let scriptTag = document.createElement("script");

                        scriptTag.src = script.props.src;
                        scriptTag.async = script.props.async;
                        scriptTag.defer = script.props.defer;

                        if (script.props.id) {
                            scriptTag.id = script.props.id;
                        }

                        if (script.content) {
                            scriptTag.innerHTML = script.content;
                        }

                        document.body.appendChild(scriptTag);
                    } catch (err) {
                        console.log(err);
                    }
                });
            }, scriptsLoadTimeout);
        };
    }

    /**
     * @private
     * @method _renderInitialScripts
     * @returns {string}
     */
    _renderInitialScripts() {
        return this._getNextScripts()
            .filter(this._isInitialScript)
            .map(({props}, index) => <script key={index} {...props} src={props.src} />);
    }

    /**
     * @private
     * @method _renderChunkedScriptsLoader
     * @returns {string}
     */
    _renderChunkedScriptsLoader() {
        let chunkedScripts = this._getNextScripts().filter(this._isChunkedScript);

        return (
            <script
                id="__NEXT_SCRIPT_CUSTOM"
                defer
                dangerouslySetInnerHTML={{
                    __html: `(${this._getChunkedScriptsRenderer().toString()})(${JSON.stringify(
                        chunkedScripts
                    )}, ${this.env.getScriptsLoadTimeout()})`
                }}
            />
        );
    }

    render() {
        return (
            <>
                {this._renderInitialScripts()}
                {this._renderChunkedScriptsLoader()}
            </>
        );
    }
}

export default NextScriptCustom;
