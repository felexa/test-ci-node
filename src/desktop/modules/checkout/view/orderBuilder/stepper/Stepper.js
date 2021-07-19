/* eslint-disable */
import React from "react";
import { merge } from "lodash";
import Step from "./Step";

class Stepper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStepName: props.currentStepName
        };

        this.confirmStep = this.confirmStep.bind(this);
        this.editStep = this.editStep.bind(this);
    }

    getStepByName(name) {
        return this.props.steps.find(item => item.name === name);
    }

    getNameOfNextStep() {
        let result = "";

        this.props.steps.forEach((step, i) => {
            if (step.name === this.state.currentStepName) {
                result = this.props.steps[i + 1].name;
            }
        });

        return result;
    }

    getStepsBeforeStep(items, name) {
        let index = items.findIndex(item => {
            return item.name === name;
        });

        return items.slice(0, index);
    }

    getPreviousSteps(name) {
        return this.getStepsBeforeStep(this.props.steps, name);
    }

    getNextSteps(name) {
        let result = this.getStepsBeforeStep(this.props.steps.reverse(), name);

        this.props.steps.reverse();

        return result;
    }

    setActivityState(step, state) {
        return merge(step, {
            complete: Boolean(state.complete),
            active: Boolean(state.active),
            disabled: Boolean(state.disabled)
        });
    }

    activeStepByName(name) {
        let step = this.getStepByName(name);

        if (step) {
            this.setActivityState(step, { active: true });
        }
    }

    toStep(name) {
        this.getPreviousSteps(name).forEach(item => {
            this.setActivityState(item, { complete: true });
        });

        this.activeStepByName(name);

        this.getNextSteps(name).forEach(item => {
            this.setActivityState(item, { disabled: true });
        });
    }

    updateCurrentStepName(name) {
        this.setState(() => ({ currentStepName: name }));
    }

    confirmStep(step) {
        this.props.onConfirm(
            step,
            () => {
                this.updateCurrentStepName(this.getNameOfNextStep());
            },
            () => {}
        );
    }

    editStep(step) {
        this.props.onEdit(
            step,
            () => {
                this.updateCurrentStepName(step.name);
            },
            () => {}
        );
    }

    renderSteps() {
        return this.props.steps.map((item, i) => {
            return <Step key={i} step={item} onConfirm={this.confirmStep} onEdit={this.editStep} />;
        });
    }

    render() {
        this.toStep(this.state.currentStepName);

        return this.renderSteps();
    }
}

export default Stepper;
