/* eslint-disable */
import React from "react";
import { Button } from "@material-ui/core";

import Items from "./items/Items";
import Total from "./total/Total";

class Check extends React.Component {
    getOrder() {
        return {
            itemsCount: this.props.order.getItems().length,
            delivery: {
                price: 150,
                description: ""
            },
            totalPrice: this.props.order.getItems().reduce(function(previousValue, item) {
                return previousValue + item.prices.current;
            }, 0)
        };
    }

    render() {
        console.log("check", this.props);

        return (
            <section className="check">
                <header>Состав заказа</header>

                <div className="check__body">
                    <Items items={this.props.order.getItems()} />
                </div>

                <div className="check__footer">
                    <Total order={this.getOrder()} />

                    <Button
                        variant="outlined"
                        color="secondary"
                        className="btn check__confirm"
                        disabled={this.props.isDisabled}
                        type="button"
                    >
                        Заказ подтверждаю
                    </Button>
                </div>
            </section>
        );
    }
}

// const enhance = compose(
//         connect(state => ({ wizardTab: state.Checkout.wizard.page })),
//     reduxForm({ form: "Checkout", validate, asyncValidate })
// );

export default Check;
