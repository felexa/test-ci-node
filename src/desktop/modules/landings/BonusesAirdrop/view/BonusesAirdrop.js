import React from "react";

// eslint-disable-next-line no-unused-vars
import _JSXStyle from "styled-jsx/style";

import Conditions from "./сonditions/Сonditions";
import HowWorks from "./howWorks/HowWorks";
import Coupons from "./coupons/Coupons";

import styles from "../styles/main.module.scss";

class BonusesAirdrop extends React.Component {
    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <div className="bonuses-airdrop">
                <style jsx>
                    {styles}
                </style>

                <Conditions />

                <HowWorks />

                <Coupons />
            </div>
        );
    }
}

export default BonusesAirdrop;
