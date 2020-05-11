import React from "react";
import Loader from 'react-loader-spinner'
import { useTheme, makeStyles, Grid } from "@material-ui/core";

interface Props {
    inline?: boolean;
}

export default function CustomLoader(props: Props) {
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
    if (props.inline) {
        return <Grid container item direction="row" justify="center">
            <Loader height={60} width={60} type="Oval" color={theme.palette.secondary.light}></Loader>
        </Grid>
    }
    return (<>
        <Grid container alignItems="center" justify="center" className={classes.root}>
            <Grid item >
                <Loader type="Oval" color={theme.palette.secondary.light}></Loader>
            </Grid>
        </Grid>
    </>)
}