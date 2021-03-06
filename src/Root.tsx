import { makeStyles, setRef } from "@material-ui/core";
import React, { useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import CookieModal from "./tsx/components/common/cookieModal";
import CustomLoader from "./tsx/components/common/customLoader";
import Footer from "./tsx/components/common/footer";
import GlobalHint from "./tsx/components/common/globalHint";
import Header from "./tsx/components/common/header";
import Routes from "./tsx/navigation/routes";
import { backendOnline } from "./tsx/tools/fetching";

export default function Root() {
    // const theme = useTheme();
    const isMobile = React.useRef(window.innerWidth < 480);
    React.useEffect(() => {
        setRef(isMobile, window.innerWidth < 480)
    });
    const useStyles = makeStyles({
        root: {
            margin: "auto",
            marginBottom: "2.5em",
            width: isMobile.current ? "85%" : "75%",
        },
    });

    const classes = useStyles();
    const [online, setOnline] = useState(false);
    const [loading, setLoading] = useState(true);


    // console.log(window.location.hostname)
    // if (!isHttps && window.location.hostname === 'localhost') {
    //     window.location.replace(`https:${location.href.substring(location.protocol.length)}`);
    // }

    backendOnline().then(res => {
        setOnline(res);
        setLoading(false);
    });
    if (loading) {
        return <CustomLoader></CustomLoader>
    } else {
        return <>
            <BrowserRouter>
                <CookieModal></CookieModal>
                <Header></Header>
                <br />
                <div className={classes.root}>
                    <Switch>
                        <Routes></Routes>
                    </Switch>
                </div>
                <Footer></Footer>
            </BrowserRouter>
            <GlobalHint open={!online} severity="error">Leider ist ein Problem mit dem Backend aufgetreten. Bitte versuchen Sie es später erneut.</GlobalHint>
        </>
    }

}