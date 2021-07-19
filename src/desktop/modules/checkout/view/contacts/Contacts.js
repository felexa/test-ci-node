/* eslint-disable */
import React from "react";
import { connect } from "react-redux";
import { Grid, TextField } from "@material-ui/core";

import _ from "lodash";

class Contacts extends React.Component {
    constructor(props) {
        super(props);

        this.changeField = this.changeField.bind(this);

        props.dispatch({
            type: "setContacts",
            contacts: {
                name: props.user.getName(),
                lastName: props.user.getLastName(),
                phone: props.user.getPhone()
            }
        });
    }

    changeField(e) {
        e.persist();

        this.props.dispatch({
            type: "setContacts",
            contacts: {
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        let store = this.props.store;

        console.log("render", this.props);

        return (
            <section className="checkout__contacts contacts">
                <header>КОНТАКТНЫЕ ДАННЫЕ</header>

                <div className="contacts__body">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} lg={12}>
                            <TextField
                                className=""
                                value={store.name}
                                onChange={this.changeField}
                                name="name"
                                fullWidth
                            />

                            <span className="error-message error-name">
                                {_.get(this, "props.error.validate.name.message", "")}
                            </span>
                        </Grid>

                        <Grid item xs={12} md={12} lg={12}>
                            <TextField
                                className=""
                                fullWidth
                                value={store.lastName}
                                onChange={this.changeField}
                                name="lastName"
                                placeholder="Фамилия"
                            />

                            <span className="error-message error-last-name">
                                {_.get(this, "props.error.validate.lastName.message", "")}
                            </span>
                        </Grid>

                        <Grid item xs={12} md={12} lg={12}>
                            <TextField
                                className=""
                                value={store.phone}
                                onChange={this.changeField}
                                fullWidth
                                name="phone"
                                placeholder="+38(0__)___-__-__"
                            />

                            <span className="error-message error-phone">
                                {_.get(this, "props.error.validate.phone.message", "")}
                            </span>
                        </Grid>
                    </Grid>
                </div>
            </section>
        );
    }
}

export default connect(function(state) {
    return { store: state.newCheckout.components.contacts };
})(Contacts);
