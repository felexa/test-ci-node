import React from "react";
import Env from "app/core/environment";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.env = Env.getInstance();
    }

    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <header className="nicorette__header">
                <div className="nicorette__banner">
                    <div className="d-none d-md-block">
                        <img src={`${this.env.getMainImageRepository()}/slides/tsitramon-promo1.jpg`} alt="Nicorette" />
                    </div>

                    <div className="d-md-none">
                        <img src={`${this.env.getMainImageRepository()}/slides/tsitramon-promo_mobile1.jpg`} alt="Nicorette" />
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
