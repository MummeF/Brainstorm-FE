import { Button, Fab, Grid, makeStyles, Paper, Typography, IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useRef, useState } from "react";
import RoomModel from "../../model/roomModel";
import StyledMessage from "../common/styledMessage";
import Contribution from "./contribution";
import ContributionModal from "./contributionModal";
import SettingsModal from "./settingsModal";


interface Props {
    room: RoomModel
}


export default function RoomPaper(props: Props) {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [contributionOpen, setContributionOpen] = useState(false);

    // const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            margin: "auto",
            width: "80%",
            minHeight: "10em",
            padding: "0.5em",
        },
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

    const isMobile = useRef(window.innerWidth < 480);


    const room = props.room;

    const contributions: JSX.Element[] = []
    room.contributions?.forEach(cont => {
        contributions.push(<Grid item key={cont.id} className={classes.contribution} xs={isMobile.current ? 12 : 6}>
            <Contribution roomId={room.id} contribution={cont}></Contribution>
        </Grid>)
    })

    const SettingsButton = () => {
        if (isMobile.current) {
            return <IconButton aria-label="settingsbutton" onClick={handleSettingsOpen}><SettingsIcon /></IconButton>
        } else {
            return <Button variant="text" color="primary" endIcon={<SettingsIcon />} onClick={handleSettingsOpen}>Raum bearbeiten</Button>
        }
    }

    return (<>

        <SettingsModal open={settingsOpen} room={props.room} handleClose={handleSettingsClose}></SettingsModal>
        <ContributionModal roomId={room.id} open={contributionOpen} handleClose={handleContsClose}></ContributionModal>

        <Grid container justify="space-between" direction="row">
            <Grid item xs={10}><Typography variant="h3">{(room.topic ? room.topic : ('Raum ' + room.id))}</Typography></Grid>
            <Grid item xs={2}><SettingsButton></SettingsButton></Grid>
        </Grid>
        <Paper elevation={1} className={classes.root}>
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
        </Paper>
    </>);

}
