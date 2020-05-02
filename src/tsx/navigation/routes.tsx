import React from "react";
import Home from "../views/home";
import { Route } from "react-router-dom";
import Kontakt from "../views/kontakt";
import Login from "../views/login";
import CreateRoom from "../views/createRoom";
import PrettyLittleSite from "../views/prettyLittleSite";
import Room from "../views/room";

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
    {
        path: "/login",
        name: "Login",
        child: <Login></Login>,
        exact: true
    },
    {
        path: "/createRoom",
        name: "Raum erstellen",
        child: <CreateRoom></CreateRoom>,
        exact: true
    },
    {
        path: "/prettyLittleSite",
        name: "Pretty Little Site",
        child: <PrettyLittleSite start={0}></PrettyLittleSite>,
        exact: true
    },
    {
        path: "/room",
        name: "Raum",
        child: <Room></Room>,
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