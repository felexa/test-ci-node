/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Stepper from "./stepper/Stepper";
import Contacts from "../contacts/Contacts";
import Delivery from "../delivery/Delivery";
import Payment from "../payment/Payment";

class OrderBuilder extends React.Component {
    constructor(props) {
        super(props);

        this.componentsContainer = new Map();
        this.stepsActions = new Map();

        this.state = {
            steps: this.buildStepsState()
        };

        this.buildComponentsContainer();
        this.buildSteps();
        this.buildStepsActions();

        this.confirmStep = this.confirmStep.bind(this);
        this.editStep = this.editStep.bind(this);
    }

    buildStepsState() {
        let result = {};

        this.props.steps.forEach(function(step) {
            result[step.name] = {
                error: {
                    validate: {}
                }
            };
        });

        return result;
    }

    buildComponentsContainer() {
        let steps = this.state.steps;

        this.componentsContainer
            .set("contacts", {
                build: () => <Contacts user={this.props.user} error={steps.contacts.error} />
            })
            .set("delivery", {
                build: () =>
                    Delivery({
                        error: steps.delivery.error
                    })
            })
            .set("payment", {
                build: () =>
                    Payment({
                        error: steps.payment.error
                    })
            });
    }

    buildSteps() {
        return this.props.steps.map(step => {
            step.component = this.componentsContainer.get(step.name).build();

            return step;
        });
    }

    buildStepsActions() {
        this.stepsActions
            .set("contacts", step => {
                //trigger events for analytics
                console.log(`confirm step ${step.name}`, step);
                this.props.onEdit();
            })
            .set("delivery", step => {
                console.log(`confirm step ${step.name}`, step);
                this.props.onEdit();
            })
            .set("payment", step => {
                this.props.onConfirm();
                console.log(`confirm step ${step.name}`, step);
            });
    }

    confirmStep(step, success, error) {
        this.stepsActions.get(step.name)(step);

        success();

        // let result = new Validator(this.props.store.contacts, {}).validate();

        // if (!result.hasError()) {
        //     success();
        // } else {
        //     error();
        //
        //     this.setState(() => {
        //         return {
        //             steps: {
        //                 [step.name]: {
        //                     error: {
        //                             validate: {
        //                         name: {message: "field is not empty"},
        //                         lastName: {message: "field is not empty"},
        //                         phone: {message: "phone format +38(0xx)xxx-xx-xx"}
        //                     }
        //                    }
        //                 }
        //             }
        //         };
        //     });
        // }

        this.setState(() => {
            return {
                steps: {
                    [step.name]: {
                        error: {
                            validate: {}
                        }
                    }
                }
            };
        });
    }

    editStep(step, success, error) {
        success();
    }

    render() {
        return (
            <div className="checkout__order-builder">
                <Stepper
                    steps={this.buildSteps()}
                    currentStepName={"contacts"}
                    onConfirm={this.confirmStep}
                    onEdit={this.editStep}
                />
            </div>
        );
    }
}

OrderBuilder.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.object).isRequired,
    user: PropTypes.object,
    onConfirm: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

export default connect(function(state) {
    return {
        store: {
            contacts: state.newCheckout.components.contacts,
            delivery: state.newCheckout.components.delivery,
            payment: state.newCheckout.components.payment,
            orderBuilder: state.newCheckout.components.orderBuilder
        }
    };
})(OrderBuilder);
