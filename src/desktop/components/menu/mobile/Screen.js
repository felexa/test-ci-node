/* eslint-disable react/prop-types */

import React from "react";
import ClassNames from "classnames";

class Screen extends React.Component {
    constructor(props) {
        super(props);

        this.renderNextScreen = this.renderNextScreen.bind(this);
        this.stepBack = this.stepBack.bind(this);
        this.getClassNamesForNextScreenByIndex = this.getClassNamesForNextScreenByIndex.bind(this);

        this.state = {
            screensHistory: [props.menu]
        };
    }

    renderNextScreen(item) {
        let history = this.state.screensHistory;

        if (item && item.items && item.items.length) {
            history.push(item);
            this.setState({ screensHistory: history });
        }
    }

    stepBack(e) {
        if (e.target && e.target.closest(".screen--visible")) {
            e.target.closest(".screen--visible").classList.add("screen--invisible");
        }

        setTimeout(() => {
            // eslint-disable-next-line react/no-access-state-in-setstate
            let history = [...this.state.screensHistory];

            history.pop();
            this.setState({ screensHistory: history });
        }, 500);
    }

    getClassNamesForNextScreenByIndex(index) {
        let screenCls = ClassNames('screen');

        if (index) {
            screenCls = ClassNames('screen screen--visible');
        }

        return screenCls;
    }

    render() {
        return (
            <div className="screen-list">
                {
                    this.state.screensHistory.map((screen, index) => (
                        <div className={this.getClassNamesForNextScreenByIndex(index)} key={index}>
                            {
                                Boolean(screen.renderFunction) && screen.renderFunction({
                                    title: screen.title,
                                    items: screen.items,
                                    parentCategoryUrl: screen.parentCategoryUrl,
                                    renderNextScreen: this.renderNextScreen,
                                    stepBack: this.stepBack
                                })
                            }
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Screen;
