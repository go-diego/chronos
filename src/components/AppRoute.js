import React from "react";
import {Route} from "react-router-dom";

export default function AppRoute({component: Component, layout: Layout, ...rest}) {
    return (
        <Route
            {...rest}
            render={matchProps => (
                <Layout {...matchProps}>
                    <Component {...matchProps} />
                </Layout>
            )}
        />
    );
}
