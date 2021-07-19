/* eslint-disable react/prop-types,max-len */
import React from "react";
import classNames from "classnames";
import Resource from "app/core/resource";

class SeoText extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;

        this.state = {
            isCollapsedContent: true
            //buttonName: this.Resource.strings.readAll
        };

        this._toggleContentSize = this._toggleContentSize.bind(this);
    }

    /**
     * @private
     * @method _toggleContentSize
     * @return {void}
     */
    _toggleContentSize() {
        this.setState((prevState) => ({
            isCollapsedContent: !prevState.isCollapsedContent
            //buttonName: !prevState.isCollapsedContent ? this.Resource.strings.readAll : this.Resource.strings.show.less
        }));
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <section className="seo rounded-16 bg-white new-super-box-shadow mt-40">
                <div className={classNames("seo__body mb-16", { "seo__body--collapsed": this.state.isCollapsedContent })}>
                    <div dangerouslySetInnerHTML={{__html: this.props.content }} />
                </div>

                {/*<div className="seo__footer">*/}
                {/*    <div className="content-controls">*/}
                {/*        <span className="link-bordered" onClick={this._toggleContentSize}>{this.state.buttonName}</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </section>
        );
    }
}

export default SeoText;
