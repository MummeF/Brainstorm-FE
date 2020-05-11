import { Button, Grid, makeStyles, TextField, Typography, useTheme } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState } from "react";
import MRoom from "../../model/roomModel";
import { REM_ROOM } from "../../tools/connections";
import { deleteAndGetJsonFromBackend, updateRoom } from "../../tools/fetching";
import { StyledModal } from "../common/styledModal";
import YesNoOption from "../common/yesNoOption";

interface Props {
    open: boolean;
    handleClose(): void;
    room: MRoom;
}


export default function SettingsModal(props: Props) {
    const [updated, setUpdated] = useState(false);
    const [state, setState] = useState(props.room);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            width: "95%",
            margin: "auto"
        },
        deleteBtn: {
            color: theme.palette.error.main,
        },
    });
    const classes = useStyles();

    const onNoOption = () => {
        setDeleteOpen(false);
    }


    if (props.open) {
        if (!updated) {
            setState(props.room);
            setUpdated(true);
        }
    } else if (updated) {
        setUpdated(false);
    }
    const deleteRoom = () => {
        deleteAndGetJsonFromBackend(REM_ROOM + '?roomId=' + props.room.id)
        // handle response
        setDeleteOpen(false);
    }
    const body = (<>
        <br />
        <Grid container className={classes.root} direction="column" spacing={1}>
            <Grid item><Typography variant="h4">Thema</Typography></Grid>
            <Grid item><TextField id="topic" helperText="Lege ein Thema für diesen Raum fest!" variant="outlined" size="small" value={state.topic} onChange={event => {
                state.topic = event.target.value;
                setState({ id: props.room.id, topic: event.target.value, contributions: props.room.contributions })
            }} /></Grid>
            <Grid item> <Button variant="text" onClick={() => setDeleteOpen(true)} className={classes.deleteBtn} startIcon={<DeleteIcon />}>Close Room</Button></Grid>
        </Grid>




    </>)
    return (
        <>
            <StyledModal open={props.open} body={body} handleClose={() => {
                updateRoom(state);
                props.handleClose();
            }} title="Settings"></StyledModal>
            <YesNoOption
                open={deleteOpen}
                question="Bist Du sicher?"
                title="Raum löschen?"
                severity="error"
                onYesOption={deleteRoom}
                onNoOption={onNoOption}
            ></YesNoOption>
        </>);

}