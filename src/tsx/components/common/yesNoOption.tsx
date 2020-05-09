import { createStyles, Dialog, DialogTitle, Grid, Theme, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';

export interface IYesNoOptionProps {
    open: boolean;
    question: string;
    title?: string;
    onYesOption(): void;
    onNoOption(): void;
    onAbortOption(): void;
}



const YesNoOption: React.FunctionComponent<IYesNoOptionProps> = (props: IYesNoOptionProps) => {
    const styles = makeStyles((theme: Theme) =>
        createStyles({
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
                color: theme.palette.warning.contrastText,
                backgroundColor: theme.palette.warning.main,
                width: "150%",
            }
        })
    );
    const classes = styles();

    return (
        <>
            <Dialog onClose={props.onAbortOption} aria-labelledby="simple-dialog-title" open={props.open}>
                <Grid container direction="column" className={classes.root}>
                    {props.title ? <Grid item><DialogTitle className={classes.title} >{props.title}</DialogTitle></Grid> : <></>}
                    <Grid item container className={classes.body} direction="row" justify="center" alignItems="center">
                        <Grid item xs><Typography align="center" variant="body1">{props.question}</Typography></Grid>
                    </Grid>
                    <Grid item container className={classes.body} direction="row" justify="center" alignItems="center">
                        <Grid item xs><Button variant="outlined">Yes</Button></Grid>
                        <Grid item xs><Button variant="outlined">No</Button></Grid>
                    </Grid>
                </Grid>
            </Dialog>);
        </>
    );
}

export default YesNoOption;