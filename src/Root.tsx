import React from "react";
import Footer from "./tsx/components/footer";
import {
    BrowserRouter,
    Switch,
} from "react-router-dom";
import Routes from "./tsx/navigation/routes";
import { useTheme, makeStyles } from "@material-ui/core";
import Header from "./tsx/components/header";

export default function Root() {
    const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            margin: "auto",
            width: "90%",
        },

    });

    const classes = useStyles();
    return <>
        <BrowserRouter>
            <Header></Header>
            <br />
            <div className={classes.root}>
                <Switch>
                    <Routes></Routes>
                </Switch>
            </div>
            <Footer></Footer>
        </BrowserRouter>
    </>
}