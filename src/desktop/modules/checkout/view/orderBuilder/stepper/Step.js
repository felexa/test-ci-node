/* eslint-disable */
import React from "react";
import { Button } from "@material-ui/core";
import classnames from "classnames";

class Step extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);
    }

    buildConfirmButton(step) {
        return (
            <Button
                variant="contained"
                color="primary"
                className="btn step__confirm"
                type="button"
                onClick={() => this.props.onConfirm(step)}
            >
                Далее
            </Button>
        );
    }

    render() {
        let step = this.props.step;

        return (
            <div
                className={classnames("checkout__step", "step", {
                    confirm: step.complete,
                    active: step.active,
                    disabled: step.disabled
                })}
            >
                <div className="step__header">
                    <strong>{step.position}</strong> <span>{step.description}</span>
                    <Button className="btn step__edit" color="secondary" onClick={() => this.props.onEdit(step)}>
                        Изменить
                    </Button>
                </div>

                <div className="step__body">
                    {step.active && step.component}

                    {step.hasNext && this.buildConfirmButton(step)}
                </div>
            </div>
        );
    }
}

export default Step;
