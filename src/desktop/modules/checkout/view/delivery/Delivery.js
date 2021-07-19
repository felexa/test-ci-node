/* eslint-disable */
import React from "react";
import PopularCities from "./region/PopularCities";

function Delivery(props) {
    return (
        <section className="checkout__delivery delivery">
            <header>Доставка</header>

            <div className="delivery__body">
                <PopularCities />
            </div>
        </section>
    );
}

export default Delivery;
