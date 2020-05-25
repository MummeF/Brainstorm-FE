import { Dialog, DialogTitle, Fab, Grid, makeStyles, TextField } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import React, { useState } from "react";
import { addContribution } from "../../../tools/fetching";

interface Props {
    open: boolean;
    handleClose(): void;
    roomId: number;
}

export default function ContributionModal(props: Props) {
    const [contributionText, setContributionText] = useState("");

    // const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            width: "30em",
            maxWidth: "95%",
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
        if (contributionText) {
            addContribution(props.roomId, contributionText);
        }
    }
    const closeWithoutSend = () => {
        setContributionText("")
        props.handleClose();
    }
    const closeAndSend = () => {
        handleSend();
        closeWithoutSend();
    }

    return (
        <Dialog
            onKeyUp={(e) => {
                switch (e.keyCode) {
                    case 13: //enter
                        closeAndSend();
                        break;
                }
            }}
            onClose={closeWithoutSend}
            aria-labelledby="simple-dialog-title"
            open={props.open}>
            <div className={classes.root}>
                <DialogTitle id="simple-dialog-title">Neuer Beitrag</DialogTitle>
                <Grid container className={classes.body} direction="row" justify="space-between" spacing={1} alignItems="flex-end">
                    <Grid item xs><TextField
                        multiline
                        rowsMax={4}
                        value={contributionText}
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
        </Dialog>

    );

}