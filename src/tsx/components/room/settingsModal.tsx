import { TextField, Typography, Button, makeStyles, useTheme, Grid } from "@material-ui/core";
import React, { useState } from "react";
import RoomModel from "../../model/roomModel";
import { updateRoom, deleteAndGetJsonFromBackend } from "../../tools/fetching";
import { StyledModal } from "../common/styledModal";
import DeleteIcon from '@material-ui/icons/Delete';
import { REM_ROOM } from "../../tools/connections";

interface Props {
    open: boolean;
    handleClose(): void;
    room: RoomModel;
}


export default function SettingsModal(props: Props) {
    const [updated, setUpdated] = useState(false);
    const [state, setState] = useState(props.room);

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
    }


    const body = (<>
        <br />
        <Grid container className={classes.root} direction="column" spacing={1}>
            <Grid item><Typography variant="h4">Thema</Typography></Grid>
            <Grid item><TextField id="topic" helperText="Lege ein Thema für diesen Raum fest!" variant="outlined" size="small" value={state.topic} onChange={event => {
                state.topic = event.target.value;
                setState({ id: props.room.id, topic: event.target.value, contributions: props.room.contributions })
            }} /></Grid>
            <Grid item> <Button variant="text" onClick={deleteRoom} className={classes.deleteBtn} startIcon={<DeleteIcon />}>Close Room</Button></Grid>
        </Grid>




    </>)
    return (
        <>
            <StyledModal open={props.open} body={body} handleClose={() => {
                updateRoom(state);
                props.handleClose();
            }} title="Settings"></StyledModal>
        </>);

}