import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import ShowPage from "./ShowPage";
import ShowsDiscover from "./ShowsDiscover";

export default function Routes() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/:id" component={ShowPage} />
                <Route exact path="/discover/:type/:id" component={ShowsDiscover} />
            </Switch>
        </Router>
    );
}
