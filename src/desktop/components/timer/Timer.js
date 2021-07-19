/*eslint-disable max-len*/
import React from 'react';
import PropTypes from 'prop-types';

import Strings from "app/core/utilites/strings";
import Translator from "app/core/utilites/strings/translator";
import Numbers from "app/core/utilites/numbers";

class Timer extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property strings
         * @type {Strings}
         */
        this.strings = Strings.getInstance();

        /**
         * @property translator
         * @type {Translator}
         */
        this.translator = Translator.getInstance();

        /**
         * @property numbers
         * @type {Numbers}
         */
        this.numbers = Numbers.getInstance();

        /**
         * @property currentTimerId
         * @type {number}
         */
        this.currentTimerId = 0;

        this.state = {
            timer: {
                hasDays() {
                    return false;
                },
                getFullDays() {
                    return 0;
                },
                getDays() {
                    return 0;
                },
                getHours() {
                    return 0;
                },
                getMinutes() {
                    return 0;
                },
                getSeconds() {
                    return 0;
                }
            }
        };
    }

    /**
     * @method componentDidMount
     * @returns {void}
     */
    componentDidMount() {
        this._initTimer();
    }

    /**
     * @method componentWillUnmount
     * @returns {void}
     */
    componentWillUnmount() {
        window.clearTimeout(this.currentTimerId);
    }

    /**
     * @private
     * @method _hasRemainderTime
     * @returns {boolean}
     */
    _hasRemainderTime() {
        return this._getLeftTimeAsMilliseconds() >= 0;
    }

    /**
     * @method _getExpireDate
     * @return {Date}
     * @private
     */
    _getExpireDate() {
        return this.props.expireDate;
    }

    /**
     * @method _getLeftTimeAsMilliseconds
     * @return {number}
     * @private
     */
    _getLeftTimeAsMilliseconds() {
        return Number(this._getExpireDate()) - Number(new Date());
    }

    /**
     * @private
     * @method _getTitleOfPluralDays
     * @returns {string}
     */
    _getTitleOfPluralDays() {
        return this.translator.plural(this.state.timer.getDays(), Translator.stringKeys.days);
    }

    /**
     * @private
     * @method _getTitleOfPluralHours
     * @returns {string}
     */
    _getTitleOfPluralHours() {
        return this.translator.plural(this.state.timer.getHours(), Translator.stringKeys.hours);
    }

    /**
     * @private
     * @method _getTitleOfPluralMinutes
     * @returns {string}
     */
    _getTitleOfPluralMinutes() {
        return this.translator.plural(this.state.timer.getMinutes(), Translator.stringKeys.minutes);
    }

    /**
     * @private
     * @method _getTitleOfPluralSeconds
     * @returns {string}
     */
    _getTitleOfPluralSeconds() {
        return this.translator.plural(this.state.timer.getSeconds(), Translator.stringKeys.seconds);
    }

    /**
     * @private
     * @method _getTimer
     * @returns {Object}
     */
    _getTimer() {
        let self = this,
            leftTime = this._getLeftTimeAsMilliseconds() / 1000,
            secondsOnDay = 24 * 60 * 60,
            secondsOnHour = 60 * 60,
            secondsOnMinute = 60,
            totalDays = Math.trunc(leftTime / secondsOnDay),
            totalHours = Math.trunc((leftTime - totalDays * secondsOnDay) / secondsOnHour),
            totalMinutes = Math.trunc((leftTime - (totalDays * secondsOnDay) - (totalHours * secondsOnHour)) / secondsOnMinute);

        return {
            hasDays() {
                let minDaysCount = 0;

                return self.getFullDays() > minDaysCount;
            },
            getFullDays() {
                return totalDays;
            },
            getDays() {
                return Math.trunc(this.getFullDays());
            },
            getHours() {
                let result = leftTime - (totalDays * secondsOnDay);

                return self.numbers.addLeadingZero(
                    Math.trunc(result / secondsOnHour)
                );
            },
            getMinutes() {
                let result = leftTime - (totalDays * secondsOnDay) - (totalHours * secondsOnHour);

                return self.numbers.addLeadingZero(
                    Math.trunc(result / secondsOnMinute)
                );
            },
            getSeconds() {
                let result = leftTime;

                result -= (totalDays * secondsOnDay);
                result -= (totalHours * secondsOnHour);
                result -= (totalMinutes * secondsOnMinute);

                return self.numbers.addLeadingZero(Math.trunc(result));
            }
        };
    }

    /**
     * @private
     * @method _expireTime
     * @returns {Timer}
     */
    _expireTime() {
        this.props.expire();

        return this;
    }

    /**
     * @private
     * @method _initTimer
     * @returns {void}
     */
    _initTimer() {
        if (this._hasRemainderTime()) {
            this.setState({
                timer: this._getTimer()
            });

            this.currentTimerId = window.setTimeout(() => {
                this._initTimer();
            }, 1000);
        } else {
            this._expireTime();
        }
    }

    /**
     * @public
     * @method render
     * @returns {String}
     */
    render() {
        return (
            <div className="timer">
                <span className="timer__days">
                    { this.state.timer.getDays() }

                    <span>
                        { this._getTitleOfPluralDays() }
                    </span>
                </span>

                <span className="timer__separator">
                    :
                </span>

                <span className="timer__hours">
                    { this.state.timer.getHours() }

                    <span>
                        { this._getTitleOfPluralHours() }
                    </span>
                </span>

                <span className="timer__separator">
                    :
                </span>

                <span className="timer__minutes">
                    { this.state.timer.getMinutes() }

                    <span>
                        { this._getTitleOfPluralMinutes() }
                    </span>
                </span>

                <span className="timer__separator">
                    :
                </span>

                <span className="timer__seconds">
                    { this.state.timer.getSeconds() }

                    <span>
                        { this._getTitleOfPluralSeconds() }
                    </span>
                </span>
            </div>
        );
    }
}

Timer.propTypes = {
    expireDate: PropTypes.instanceOf(Date),
    expire: PropTypes.func
};

Timer.defaultProps = {
    expireDate: null,
    expire: () => {}
};

export default Timer;
