import React from "react";
import Home from "../views/home";
import { Route } from "react-router-dom";
import Kontakt from "../views/kontakt";

interface InternalRoute {
    path: string;
    exact: boolean;
    name: string;
    child: JSX.Element;
    icon?: JSX.Element;
}

const routes: InternalRoute[] = [
    {
        path: "/",
        name: "Home",
        child: <Home></Home>,
        exact: true
    },
    {
        path: "/contact",
        name: "Kontakt",
        child: <Kontakt></Kontakt>,
        exact: true
    },
]

function nameForPath(path: string) {
    return routes.find((route) => route.path === path)?.name;
}

export default function Routes() {
    const name = nameForPath(window.location.pathname);
    window.document.title = "Brainstorm" + (name !== undefined ? " - " + name : "");

    

    let displayedRoutes: JSX.Element[] = [];
    routes.forEach((route => {
        displayedRoutes.push(route.exact ? <Route exact path={route.path} children={route.child}></Route>
            : <Route path={route.path} children={route.child}></Route>)
    }));


    return <>
        {displayedRoutes}
    </>
}