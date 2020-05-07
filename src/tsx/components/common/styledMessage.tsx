import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

interface Props {
    message: string;
}

export default function StyledMessage(props: Props) {
    const useStyles = makeStyles({
        root: {
            width: "100%",
            margin: "0.5em"
        }
    });
    const classes = useStyles();
    return (<>
        <Typography className={classes.root} variant="body1"><i>{props.message}</i></Typography>
    </>);
}