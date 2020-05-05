import React, { useState } from "react";
import RoomModel from "../model/roomModel";
import { Typography, makeStyles, Paper, Grid, Button, Fab } from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsModal from "./settingsModal";
import Contribution from "./contribution";
import StyledMessage from "./styledMessage";
import AddIcon from '@material-ui/icons/Add';
import ContributionModal from "./contributionModal";


interface Props {
    room: RoomModel
    updateRoom(): void;
}


export default function RoomPaper(props: Props) {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [contributionOpen, setContributionOpen] = useState(false);

    // const theme = useTheme();

    const useStyles = makeStyles({
        contribution: {
            width: "100%",
        },
    });
    const classes = useStyles();

    const handleSettingsClose = () => {
        setSettingsOpen(false)
    }
    const handleSettingsOpen = () => {
        setSettingsOpen(true)
    }
    const handleContsClose = () => {
        setContributionOpen(false)
    }
    const handleContsOpen = () => {
        setContributionOpen(true)
    }
    const room = props.room;

    const contributions: JSX.Element[] = []
    room.contributions?.forEach(cont => {
        contributions.push(<Grid item className={classes.contribution} xs={6}><Contribution content={cont.content}></Contribution></Grid>)
    })


    return (<>

        <SettingsModal updateParentRoom={props.updateRoom} open={settingsOpen} room={props.room} handleClose={handleSettingsClose}></SettingsModal>
        <ContributionModal roomId={room.id} open={contributionOpen} handleClose={handleContsClose}></ContributionModal>

        <Grid container justify="space-between" direction="row">
            <Grid item><Typography variant="h3">Raum{' ' + (room.topic ? room.topic : room.id)}</Typography></Grid>
            <Grid item><Button variant="text" color="primary" endIcon={<SettingsIcon />} onClick={handleSettingsOpen}>Raum bearbeiten</Button></Grid>
        </Grid>
        <RootPaper>
            <Grid container direction="row" justify="flex-end">
                <Grid item>
                    <Fab onClick={handleContsOpen} color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Grid>
            </Grid>
            <br />
            <Grid
                container
                spacing={2}
            >
                {contributions.length > 0 ? contributions : <>
                    <StyledMessage message="Es wurden noch keine Beiträge geschrieben."></StyledMessage>
                </>}
            </Grid>
        </RootPaper>
    </>);

}

const RootPaper: React.StatelessComponent = props => {
    // const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            margin: "auto",
            width: "80%",
            minHeight: "10em",
            padding: "0.5em",
        },
    });
    const classes = useStyles();
    return (<>
        <Paper elevation={1} className={classes.root}>
            {props.children}
        </Paper>
    </>);
}