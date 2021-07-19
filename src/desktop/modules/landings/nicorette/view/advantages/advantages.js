import React from "react";

class Advantages extends React.Component {
    /**
     * @public
     * @method render
     * @returns {React.ReactElement}
     */
    render() {
        return (
            <section className="nicorette__advantages advantages section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="advantages__title">
                                Препарати нікотинозамісної терапії
                            </div>
                        </div>

                        <div className="col-12 col-md-6">
                            <div className="advantages__items">
                                <div className="advantages__item">
                                    містять низьку дозу нікотину
                                </div>

                                <div className="advantages__item">
                                    слід застосовувати кожного разу, коли
                                    курець зазвичай випалив би цигарку<sup>1</sup>
                                </div>

                                <div className="advantages__item">
                                    можуть допомогти курцям кинути палити
                                    або скоротити вживання тютюну<sup>1</sup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Advantages;
