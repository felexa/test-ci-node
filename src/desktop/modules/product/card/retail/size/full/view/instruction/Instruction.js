import React from "react";
import PropTypes from "prop-types";

import Box from "app/core/components/Box";

import DeviceDesktop from "desktop/components/deviceDetector/desktop/Detector";
import DeviceMobile from "desktop/components/deviceDetector/mobile/Detector";
import Accordion from "desktop/components/accordion/Accordion";
import Warning from "desktop/components/warning/product/Warning";

import DesctopView from "./DesctopView";

class Instruction extends React.Component {
    /**
     * @private
     * @method _hasTitle
     * @returns {boolean}
     */
    _hasTitle() {
        return Boolean(this._getTitle());
    }

    /**
     * @method _hasNotice
     * @returns {boolean}
     * @private
     */
    _hasNotice() {
        return Boolean(this.props.notice);
    }

    /**
     * @private
     * @method _getTitle
     * @return {string}
     */
    _getTitle() {
        return this.props.title;
    }

    /**
     * @method _getNotice
     * @returns {Object}
     */
    _getNotice() {
        return this.props.notice;
    }

    /**
     * @private
     * @method _createInstructionForAccordion
     * @return {Array}
     */
    _createInstructionForAccordion() {
        return this.props.instruction.map((item) => ({
            id: item.getId(),
            title: `<h3>${item.getName()}</h3>`,
            description: item.getText()
        }));
    }

    render() {
        return (
            <Box
                className="bg-white page-section d-flex flex-column justify-content-between new-super-box-shadow"
                rounded={16}
            >
                <section className="instruction d-flex flex-column">
                    <DeviceDesktop>
                        <DesctopView
                            title={this._getTitle()}
                            html={this.props.instruction}
                        />
                    </DeviceDesktop>

                    <DeviceMobile>
                        {this._hasTitle() && (
                        <div className="instruction__header">
                            <h2 className="text-black">
                                <span dangerouslySetInnerHTML={{__html: this._getTitle()}} />
                            </h2>
                        </div>
                        )}
                        <Accordion
                            items={this._createInstructionForAccordion()}
                            asHtml
                            className="mb-12"
                        />
                    </DeviceMobile>
                </section>

                <Warning />
            </Box>
        );
    }
}

Instruction.propTypes = {
    title: PropTypes.string,
    instruction: PropTypes.instanceOf(Object).isRequired,
    notice: PropTypes.instanceOf(Object)
};

Instruction.defaultProps = {
    title: "",
    notice: null
};

export default Instruction;
