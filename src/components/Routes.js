import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Navbar from "./Navbar";
import Search from "./Search";
import ShowPage from "./ShowPage";
import ShowsDiscover from "./ShowsDiscover";

export default function Routes() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/:type/:id" component={ShowPage} />
                <Route exact path="/discover/:type/:id" component={ShowsDiscover} />
                <Route exact path="/search&q=:title" component={Search} />
            </Switch>
        </Router>
    );
}
