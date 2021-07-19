/* eslint-disable */
import React from "react";
import { Grid } from "@material-ui/core";

// import Items from "./items/Items";

function Total(props) {
    return (
        <div className="check__total total">
            <div className="total__body">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={8}>
                        <div className="">{props.order.itemsCount} товара на сумму</div>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4}>
                        <div className="">{props.order.totalPrice} грн</div>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={8}>
                        <div className="">доставка</div>
                    </Grid>

                    <Grid item xs={12} md={12} lg={4}>
                        <div className="">{props.order.delivery.price} грн</div>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={8}>
                        <div className="">Итого к оплате</div>
                    </Grid>

                    <Grid item xs={12} md={12} lg={4}>
                        <div className="">{props.order.totalPrice + props.order.delivery.price} грн</div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Total;
