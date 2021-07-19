/* eslint-disable */
import React from "react";
import { Grid } from "@material-ui/core";

function Item(props) {
    return (
        <div className="item">
            <Grid container spacing={2}>
                <Grid item xs={4} md={3} lg={3}>
                    <div className="item__preview">
                        <img
                            src={props.item.preview.src}
                            title={props.item.preview.title}
                            alt={props.item.preview.alt}
                        />
                    </div>
                </Grid>

                <Grid item xs={8} md={9} lg={9}>
                    <div className="item__name">
                        <a href={props.item.url}>{props.item.name}</a>
                    </div>

                    <div className="item__price">
                        {props.item.prices.current.toLocaleString("en")} <span className="currency">грн</span>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Item;
