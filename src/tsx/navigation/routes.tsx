import React from "react";
import Home from "../views/home";
import { Route } from "react-router-dom";
import Kontakt from "../views/kontakt";
import Login from "../views/login";
import CreateRoom from "../views/createRoom";
import Room from "../views/room";

interface InternalRoute {
    path: string;
    exact: boolean;
    name: string;
    child?: JSX.Element;
    component?: any; //Not recommended!! Use Only for dynamic routes!
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
        path: "/room/:id",
        name: "Raum",
        component: Room,
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
    routes.forEach(route => {
        if (route.child) {
            displayedRoutes.push(route.exact ? <Route key={route.path} exact path={route.path} children={route.child}></Route>
                : <Route key={route.path} path={route.path} children={route.child}></Route>)
        } else if (route.component) {
            displayedRoutes.push(route.exact ? <Route key={route.path} exact path={route.path} component={route.component}></Route>
                : <Route key={route.path} path={route.path} children={route.component}></Route>)
        } else {
            console.error('No component defined.')
        }
    });


    return <>
        {displayedRoutes}
    </>
}