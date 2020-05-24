import { Dialog, DialogTitle, Fab, Grid, makeStyles, TextField } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { ChangeEvent, useState } from "react";
import MContribution from "../../../model/contributionModel";
import { UPDT_CTRBT } from "../../../tools/connections";
import { putAndGetJsonFromBackend } from "../../../tools/fetching";
import CustomLoader from "../../common/customLoader";


interface Props {
    open: boolean;
    handleClose(): void;
    roomId: number;
    subjects: string[];
    contribution: MContribution;
}

export default function SubjectModal(props: Props) {
    const [subject, setSubject] = useState(props.contribution.subject);
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
        if (subject) {
            putAndGetJsonFromBackend(UPDT_CTRBT + '?roomId=' + props.roomId + '&contributionId=' + props.contribution.id + '&subject=' + subject);
        }
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
            setSubject(props.contribution.subject);
            setLoaded(true);
        }
        if (!loaded) {
            return <CustomLoader></CustomLoader>
        } else {
            return (
                <Dialog onKeyUp={(e) => {
                    switch (e.keyCode) {
                        case 13: //enter
                            closeAndSend();
                            break;
                    }
                }} onClose={closeWithoutSend} aria-labelledby="simple-dialog-title" open={props.open}>
                    <div className={classes.root}>
                        <DialogTitle id="simple-dialog-title">Titel bearbeiten</DialogTitle>
                        <Grid container className={classes.body} direction="row" justify="space-between" alignItems="flex-end">
                            <Grid item xs>
                                <Autocomplete id="subjects"
                                    options={props.subjects}
                                    disableClearable
                                    autoComplete
                                    value={subject}
                                    onChange={(event: ChangeEvent<{}>, newValue: string | null) => setSubject(newValue ?? subject)}
                                    freeSolo
                                    getOptionLabel={option => option ? option : ""}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            value={subject}
                                            onChange={event => setSubject(event.target.value)}
                                            className={classes.bodyItem}
                                            label="Hier Titel bearbeiten">
                                        </TextField>} />
                            </Grid>
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