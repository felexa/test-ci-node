import React from "react";

import AccordionBase from "app/desktop/components/accordion/Accordion";
import Panel from "./panel/Panel";

class Accordion extends AccordionBase {
    renderItems() {
        return this.props.items.map((panel, index) => (
            <Panel
                key={index}
                title={panel.title}
                selectItem={() => this.selectItem(index)}
                active={this.state.activePanels[index]}
                asHtml={this.props.asHtml}
                htmlDataAttribute={panel.htmlDataAttribute}
                {...this.props.panelProps}
            >
                {panel.description}
            </Panel>
        ));
    }
}

export default Accordion;
