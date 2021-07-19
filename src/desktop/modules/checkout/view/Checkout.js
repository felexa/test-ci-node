/* eslint-disable */
import React from "react";
import classnames from "classnames";
import { Grid, Typography } from "@material-ui/core";
import OrderBuilder from "./orderBuilder/OrderBuilder";
import Check from "./check/Check";

class Checkout extends React.Component {
    constructor(props) {
        super(props);

        console.log("Checkout props", props);

        this.state = {
            order: {
                isDisabled: true
            }
        };

        this.props.options.checkout.getPopularCities(items => {
            console.log(items);
        });
    }

    setOrderState(isDisabled) {
        this.setState(() => {
            return { order: { isDisabled } };
        });
    }

    confirmOrderBuilder() {
        console.log("confirmOrderBuilder");

        this.setOrderState(false);
    }

    editOrderBuilder() {
        console.log("editOrderBuilder");

        this.setOrderState(true);
    }

    render() {
        let { handleSubmit, wizardTab } = this.props;

        return (
            <div className="checkout-page">
                <div className="wrapper">
                    <div className="checkout-content-holder">
                        <Typography variant="h2" className="checkout-title mb20 mt30">
                            Оформление заказа
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={8}>
                                <div className="checkout-wizard-holder">
                                    {/*<Contacts user={props.options.defaultProps.user}/>*/}

                                    <OrderBuilder
                                        steps={this.props.options.defaultProps.steps}
                                        user={this.props.options.defaultProps.user}
                                        onConfirm={() => {
                                            this.confirmOrderBuilder();
                                        }}
                                        onEdit={() => {
                                            this.editOrderBuilder();
                                        }}
                                    />

                                    {/*<WizardHorizontal handleSubmitForm={handleSubmit} />*/}
                                </div>
                            </Grid>

                            <Grid item xs={12} md={12} lg={4}>
                                <div className={classnames("checkout-sidebar-holder", "topFixed")}>
                                    <div className="purchases-block">
                                        <div className="purchases-total">
                                            <Check
                                                order={this.props.options.defaultProps.order}
                                                isDisabled={this.state.order.isDisabled}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}

export default Checkout;
