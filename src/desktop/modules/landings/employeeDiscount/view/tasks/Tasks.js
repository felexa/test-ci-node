/* eslint-disable max-len */
import React from "react";

import Env from "app/core/environment";
import Resource from "app/core/resource";

class Tasks extends React.Component {
    constructor(props) {
        super(props);

        /**
         * @property Resource
         * @type {Object}
         */
        this.Resource = Resource;

        /**
         * @property HTMLResource
         * @type {Object}
         */
        this.HTMLResource = Resource.getHTML(Env.getInstance().getLanguage());

        /**
         * @property stringsResource
         * @type {Object}
         */
        this.stringsResource = Resource.getStrings(Env.getInstance().getLanguage());
    }

    render() {
        return (
            <section className="tasks section color-black">
                <div className="container-fluid">
                    <header className="tasks__header">
                        <h2 className="tasks__title section__title">
                            {this.stringsResource.examplesOfTasks}
                        </h2>
                    </header>

                    <div className="tasks__body">
                        <div className="d-lg-flex justify-content-between">
                            <div className="tasks__description">
                                <p>{this.HTMLResource.employeeDiscount.examplesOfTasks.first}</p>
                                <p>{this.HTMLResource.employeeDiscount.examplesOfTasks.second}</p>
                            </div>

                            <div className="tasks__available">
                                <div className="available__title">
                                    {this.stringsResource.rightNowYouCan}:
                                </div>
                                <div className="available__items">
                                    <div className="item d-flex align-items-center">
                                        <div className="item__preview d-flex align-items-center justify-content-center">
                                            <i className="icon icon-edit" />
                                        </div>

                                        <div
                                            className="item__description"
                                            dangerouslySetInnerHTML={{__html: this.HTMLResource.employeeDiscount.examplesOfTasks.rightNowYouCan.task1}}
                                        />
                                    </div>

                                    <div className="item d-flex align-items-center">
                                        <div className="item__preview d-flex align-items-center justify-content-center">
                                            <i className="icon icon-heart" />
                                        </div>

                                        <div
                                            className="item__description"
                                            dangerouslySetInnerHTML={{__html: this.HTMLResource.employeeDiscount.examplesOfTasks.rightNowYouCan.task2}}
                                        />
                                    </div>

                                    <div className="item d-flex align-items-center">
                                        <div className="item__preview d-flex align-items-center justify-content-center">
                                            <i className="icon icon-like" />
                                        </div>

                                        <div
                                            className="item__description"
                                            dangerouslySetInnerHTML={{__html: this.HTMLResource.employeeDiscount.examplesOfTasks.rightNowYouCan.task3}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Tasks;
