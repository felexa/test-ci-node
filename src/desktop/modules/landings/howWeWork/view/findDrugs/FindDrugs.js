import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class FindDrugs extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;

        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());

        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {React.element}
     */
    render() {
        return (
            <div className="find-drugs">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col d-lg-flex flex-lg-row-reverse align-items-end">
                            <div className="find-drugs__body">
                                <div
                                    className="find-drugs__description color-white line-height-1-5"
                                    dangerouslySetInnerHTML={{__html: this.HTMLResource.orderingInstruction}}
                                />

                                <div className="find-drugs__to-catalog">
                                    <a
                                        href={this.Resource.links.homePage}
                                        className="btn-default btn-md"
                                    >
                                        {this.stringsResource.findDrugs}
                                    </a>
                                </div>
                            </div>

                            <div className="find-drugs__footer">
                                <div className="find-drugs__preview">
                                    <img
                                        src={this.Resource.links.howWorksFind}
                                        alt="Apteka24"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FindDrugs;
