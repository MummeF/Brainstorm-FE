import React from "react";
import Loader from 'react-loader-spinner'
import { useTheme, makeStyles, Grid } from "@material-ui/core";

export default function CustomLoader() {
    const theme = useTheme();
    const useStyles = makeStyles({
        root: {
            height: "100%",
            width: "100%",
            position: "fixed",
            left: 0,
            top: 0,
            backgroundColor: "black",
            opacity: 0.7,
            zIndex: 9999999
        },
    });
    const classes = useStyles();
    return (<>
        <Grid container alignItems="center" justify="center" className={classes.root}>
            <Grid item >
                <Loader type="Oval" color={theme.palette.secondary.light}></Loader>
            </Grid>
        </Grid>
    </>)
}