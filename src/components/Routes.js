import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Trendings from "./Trendings";
import Navbar from "./Navbar";
import Search from "./Search";
import ShowPage from "./ShowPage";
import ShowsDiscover from "./ShowsDiscover";
import Homepage from "./Homepage";

export default function Routes() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/trendings/:type" component={Trendings} />
                <Route exact path="/search&q=:title" component={Search} />
                <Route exact path="/discover/:type/:id" component={ShowsDiscover} />
                <Route exact path="/:type" component={Homepage} />
                <Route exact path="/:type/:id" component={ShowPage} />
            </Switch>
        </Router>
    );
}
