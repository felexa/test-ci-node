import React from "react";
import PropTypes from "prop-types";

import Resource from "app/core/resource";

import Image from "components/image/Image";

class Members extends React.Component {
    constructor(props) {
        super(props);

        this.Resource = Resource;
    }

    /**
     * @privat
     * @method renderMember
     * @return {Array}
     */
    _renderMember() {
        return (
            this.props.items.map((member) => (
                <div key={member.getId()} className="col-12 col-sm-6 col-md-3  text-center">
                    <div className="member">
                        <a className="member__preview" href={member.getUrl()} target="_blank">
                            <Image
                                src={member.getAvatar().getSrc()}
                                alt={member.getFullName()}
                                title={member.getFullName()}
                                width={member.getAvatar().getSizes().getMedium().getWidth()}
                                height={member.getAvatar().getSizes().getMedium().getHeight()}
                            />
                        </a>

                        <p className="member__name"><a href={member.getUrl()} target="_blank">{member.getFullName()}</a></p>

                        <p className="member__position">{member.getPosition()}</p>
                    </div>
                </div>
            ))
        );
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="members__items">
                <div className="row">
                    { this._renderMember() }
                </div>
            </div>
        );
    }
}

Members.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
};

Members.defaultProps = {
    items: {}
};

export default Members;
