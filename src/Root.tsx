import React from "react";
import Footer from "./tsx/components/footer";
import {
    BrowserRouter,
    Switch,
} from "react-router-dom";
import Routes from "./tsx/navigation/routes";

export default function Root() {
    return <>
        <BrowserRouter>
            <Switch>
                <Routes></Routes>
            </Switch>
            <Footer></Footer>
        </BrowserRouter>
    </>
}