import React from "react";
import {Route, Switch, Redirect} from "react-router-dom";

import AppRoute from "../components/AppRoute";
import Home from "../containers/Home";
import HomeLayout from "../containers/HomeLayout";
import Details from "../containers/Details";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <AppRoute path="/home" layout={HomeLayout} component={Home} />
            <AppRoute path="/details/:tagId" layout={HomeLayout} component={Details} />
        </Switch>
    );
}
