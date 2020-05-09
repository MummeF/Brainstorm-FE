import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import CustomLoader from "./tsx/components/common/customLoader";
import Footer from "./tsx/components/common/footer";
import GlobalHint from "./tsx/components/common/globalHint";
import Header from "./tsx/components/common/header";
import Routes from "./tsx/navigation/routes";
import { backendOnline } from "./tsx/tools/fetching";

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
            {online ? <></> : <GlobalHint severity="error">Leider ist ein Problem mit dem Backend aufgetreten. Bitte versuchen Sie es später erneut.</GlobalHint>}
        </>

    }

}