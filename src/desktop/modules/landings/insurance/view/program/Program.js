import React from "react";

import Box from "app/core/components/Box";
import Env from "app/core/environment";
import Resource from "app/core/resource";

class Program extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="insurance__program">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <Box
                                component="div"
                                rounded={16}
                                className="bg-white new-super-box-shadow color-black text-center line-height-1-5 program__body"
                            >
                                <p>{this.HTMLResource.insurance.program.description}</p>

                                <p dangerouslySetInnerHTML={{__html: this.HTMLResource.insurance.program.proposal}} />
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Program;
