import React, { useState } from "react";
import { TextField, makeStyles, Grid, Dialog, DialogTitle, Fab } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import { putAndGetJsonFromBackend } from "../../../tools/fetching";
import { UPDT_CTRBT } from "../../../tools/connections";
import CustomLoader from "../../common/customLoader";
import MContribution from "../../../model/contributionModel";

interface Props {
    open: boolean;
    handleClose(): void;
    roomId: number;
    contribution: MContribution;
}

export default function EditModal(props: Props) {
    const [contributionText, setContributionText] = useState(props.contribution.content);
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
    const [loaded, setLoaded] = useState(false);


    const handleSend = () => {
        putAndGetJsonFromBackend(UPDT_CTRBT + '?roomId=' + props.roomId + '&contributionId=' + props.contribution.id + '&content=' + contributionText);
    }
    const closeWithoutSend = () => {
        setLoaded(false)
        props.handleClose();
    }
    const closeAndSend = () => {
        handleSend();
        closeWithoutSend();
    }
    if (props.open) {
        if (!loaded) {
            setContributionText(props.contribution.content);
            setLoaded(true);
        }
        if (!loaded) {
            return <CustomLoader></CustomLoader>
        } else {
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
                        <DialogTitle id="simple-dialog-title">Beitrag bearbeiten</DialogTitle>
                        <Grid container className={classes.body} direction="row" justify="space-between" alignItems="flex-end">
                            <Grid item xs><TextField value={contributionText}
                                multiline
                                rowsMax={4}
                                onChange={(event) => setContributionText(event.target.value)}
                                className={classes.bodyItem}
                                label="Hier Beitrag bearbeiten"></TextField></Grid>
                            <Grid item xs={1}>
                                <Fab size="small" onClick={closeAndSend} color="primary" aria-label="send">
                                    <SendIcon />
                                </Fab>
                            </Grid>
                        </Grid>
                    </div>
                </Dialog>);
        }
    } else {
        return null;
    }

}