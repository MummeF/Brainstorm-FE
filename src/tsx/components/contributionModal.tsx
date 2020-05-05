import React, { useState } from "react";
import { StyledModal } from "./styledModal";
import { Typography, TextField, useTheme, makeStyles, Grid, Dialog, DialogTitle, List, ListItem, ListItemAvatar, Avatar, ListItemText, Fab } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import { addContribution } from "../tools/fetching";

interface Props {
    open: boolean;
    handleClose(): void;
    roomId: number;
}

export default function ContributionModal(props: Props) {
    const [contributionText, setContributionText] = useState("");

    const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            width: "30em"
        },
        body: {
            margin: "auto",
            paddingBottom: "0.5em",
            width: "95%",
        },
        bodyItem: {
            width: "100%",
        },

    });
    const classes = useStyles();
    const handleSend = () => {
        console.log(contributionText);
        addContribution(props.roomId, contributionText);
        setContributionText("")
    }
    const closeAndSend = () => {
        handleSend();
        props.handleClose();
    }

    return (
        <Dialog onClose={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
            <div className={classes.root}>
                <DialogTitle id="simple-dialog-title">Neuer Beitrag</DialogTitle>
                <Grid container className={classes.body} direction="row" justify="space-between" alignItems="flex-end">
                    <Grid item xs><TextField value={contributionText}
                        onChange={(event) => setContributionText(event.target.value)}
                        className={classes.bodyItem}
                        label="Hier Beitrag eingeben"></TextField></Grid>
                    <Grid item xs={1}>
                        <Fab size="small" onClick={closeAndSend} color="primary" aria-label="send">
                            <SendIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </div>
        </Dialog>);
    // const body = (<>
    // <Grid>

    // </Grid>
    //     <TextField className={}></TextField>
    // </>)

    // return <>
    //     <StyledModal title="Neuer Beitrag" body={body} open={props.open} handleClose={props.handleCLose}></StyledModal>
    // </>

}