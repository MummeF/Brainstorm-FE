import React from "react";
import Home from "../views/home";
import { Route, Switch } from "react-router-dom";
import EnterRoom from "../views/enterRoom";
import CreateRoom from "../views/createRoom";
import Room from "../views/room";
import RoomClose from "../views/roomClose";
import Page404 from "../views/404";
import Result from "../views/result";
import About from "../views/about";

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
        path: "/roomClosed",
        name: "Raum geschlossen",
        child: <RoomClose></RoomClose>,
        exact: true
    },
    {
        path: "/about",
        name: "Über uns",
        child: <About></About>,
        exact: true
    },
    {
        path: "/enterRoom",
        name: "Raum beitreten",
        child: <EnterRoom></EnterRoom>,
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
    {
        path: "/result/:id",
        name: "Ergebnis",
        component: Result,
        exact: true
    },


    //always leave 404 page at the end of the list
    {
        path: "",
        name: "Page not found",
        component: Page404,
        exact: false
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
        <Switch>
            {displayedRoutes}
        </Switch>
    </>
}