import { Button, Dialog, DialogTitle, Grid, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';

enum Color {
    "info", "success", "warning", "error"
}

export interface IYesNoOptionProps {
    open: boolean;
    question: string;
    severity: "info" | "success" | "warning" | "error";
    title?: string;
    filledWithSeverity?: boolean;
    yesFilled?: boolean;
    noFilled?: boolean;
    onYesOption(): void;
    onNoOption(): void;
    onAbortOption?(): void;
}



const YesNoOption: React.FunctionComponent<IYesNoOptionProps> = (props: IYesNoOptionProps) => {
    const theme = useTheme();
    let titleColor;
    switch (props.severity) {
        case "info":
            titleColor = theme.palette.info;
            break;
        case "success":
            titleColor = theme.palette.success;
            break;
        case "warning":
            titleColor = theme.palette.warning;
            break;
        case "error":
            titleColor = theme.palette.error;
            break;
    }

    const useStyles = makeStyles({
        root: {
            minWidth: "30em",
            maxWidth: "95%",
            overflow: "hidden"
        },
        body: {
            margin: "auto",
            width: "80%",
            minHeight: "5em"
        },
        bodyItem: {
            width: "100%",
        },
        title: {
            color: titleColor.contrastText,
            backgroundColor: titleColor.main,
            width: "100%",
        },
        yesBtn: {
            width: "100%",
            backgroundColor: props.yesFilled ? (props.filledWithSeverity ? titleColor.main : theme.palette.info.main) : "white",
            color: props.yesFilled ? (props.filledWithSeverity ? titleColor.contrastText : theme.palette.info.contrastText) : "black",
            '&:hover': {
                backgroundColor: props.yesFilled ? (props.filledWithSeverity ? titleColor.light : theme.palette.info.light) : theme.palette.grey[300],
            }
        },
        noBtn: {
            width: "100%",
            backgroundColor: props.noFilled ? (props.filledWithSeverity ? titleColor.main : theme.palette.info.main) : "white",
            color: props.noFilled ? (props.filledWithSeverity ? titleColor.contrastText : theme.palette.info.contrastText) : "black",
            '&:hover': {
                backgroundColor: props.noFilled ? (props.filledWithSeverity ? titleColor.light : theme.palette.info.light) : theme.palette.grey[300],
            }
        },

    });
    const classes = useStyles();


    return (
        <>
            <Dialog onClose={props.onAbortOption ? props.onAbortOption : props.onNoOption} aria-labelledby="simple-dialog-title" open={props.open}>
                <Grid container direction="column" className={classes.root}>
                    {props.title ? <Grid item><DialogTitle className={classes.title} >{props.title}</DialogTitle></Grid> : <></>}
                    <Grid item container className={classes.body} direction="row" justify="center" alignItems="center">
                        <Grid item xs><Typography color="inherit" align="center" variant="body1">{props.question}</Typography></Grid>
                    </Grid>
                    <Grid item container spacing={2} className={classes.body} direction="row" justify="center" alignItems="center">
                        <Grid item xs><Button onClick={props.onYesOption} className={classes.yesBtn} variant="outlined">Yes</Button></Grid>
                        <Grid item xs><Button onClick={props.onNoOption} className={classes.noBtn} variant="outlined">No</Button></Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    );
}

export default YesNoOption;