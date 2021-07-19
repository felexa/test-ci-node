/* eslint-disable */
import React from "react";
import { Grid, TextField, MenuItem } from "@material-ui/core";

function Payment(props) {
    function getItems() {
        return (props.items || []).map(function(item) {
            return (
                <MenuItem key={item.id} value={item.id}>
                    {item.name}
                </MenuItem>
            );
        });
    }

    return (
        <section className="checkout__payment payment">
            <header>Оплата</header>

            <div className="payment__body">
                <Grid container spacing={2}>
                    <Grid item xs={4} md={4} lg={4}>
                        <TextField select fullWidth label="Способ оплаты" onChange={() => {}}>
                            {getItems()}
                        </TextField>
                    </Grid>
                </Grid>
            </div>
        </section>
    );
}

export default Payment;
