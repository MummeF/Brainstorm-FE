import React, { useState } from "react";
import Footer from "./tsx/components/common/footer";
import {
    BrowserRouter,
    Switch,
} from "react-router-dom";
import Routes from "./tsx/navigation/routes";
import {  makeStyles, Typography } from "@material-ui/core";
import Header from "./tsx/components/common/header";
import { backendOnline } from "./tsx/tools/fetching";
import CustomLoader from "./tsx/components/common/customLoader";

export default function Root() {
    // const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            margin: "auto",
            width: "90%",
        },

    });

    const classes = useStyles();
    const [online, setOnline] = useState(false);
    const [loading, setLoading] = useState(true);

    backendOnline().then(res => {
        setOnline(res);
        setLoading(false);
    });
    if (loading) {
        return <CustomLoader></CustomLoader>
    } else {
        if (!online) {
            return <Typography variant="h2">Ein Fehler ist aufgetreten!</Typography>
        } else {
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
    }

}