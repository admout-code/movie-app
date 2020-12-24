import React from "react";
import "./App.css";
import Routes from "./components/Routes";
import GlobalStyle from "./globalStyles";

export default function App() {
    return (
        <div>
            <GlobalStyle />
            <Routes />
        </div>
    );
}
