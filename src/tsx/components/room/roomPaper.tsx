import { Button, Fab, Grid, IconButton, makeStyles, Paper, Typography, TextField, setRef } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useRef, useState, useEffect } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';
import MRoom from "../../model/roomModel";
import StyledMessage from "../common/styledMessage";
import Contribution from "./contribution";
import ContributionModal from "./contributionModal";
import SettingsModal from "./settingsModal";
import CheckIcon from '@material-ui/icons/Check';
import ShareIcon from '@material-ui/icons/Share';

interface Props {
    room: MRoom
}


export default function RoomPaper(props: Props) {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [contributionOpen, setContributionOpen] = useState(false);

    const [share, setShare] = useState(false);
    const [copied, setCopied] = useState(false);

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
        share: {
            paddingRight: "1em",
            textAlign: "right",
            width: "100%",
        },
        linkInput: {
            direction: "rtl",
        }
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
    useEffect(() => {
        setRef(isMobile, window.innerWidth < 480)
    })


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

    const ShareButton = () => {
        if (isMobile.current) {
            return <IconButton aria-label="shareIcon" onClick={() => setShare(true)}><ShareIcon /></IconButton>
        } else {
            return <Button startIcon={<ShareIcon />} variant="text" color="secondary" onClick={() => setShare(true)}>Share Link</Button>
        }
    }

    const CopyButton = () => {
        if (copied) {
            return <Button startIcon={<CheckIcon />} variant="text" color="secondary">Copied</Button>;
        } else {
            return <CopyToClipboard text={window.location.href} onCopy={() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                    setShare(false);
                }, 2000);
            }}>
                <Button variant="text" color="secondary" startIcon={<FileCopyIcon />}>Copy Link</Button>
            </CopyToClipboard>
        }
    }

    const CopyField = () => {
        return <>
            {isMobile.current ? <></> : <TextField className={classes.linkInput} size="small" variant="outlined" disabled value={window.location.href}></TextField>}
            <CopyButton />
        </>
    }

    return <>
        <SettingsModal open={settingsOpen} room={props.room} handleClose={handleSettingsClose}></SettingsModal>
        <ContributionModal roomId={room.id} open={contributionOpen} handleClose={handleContsClose}></ContributionModal>
        <Grid container justify="space-between" direction="row">
            <Grid item xs={6}><Typography variant="h3">{(room.topic ? room.topic : ('Raum ' + room.id))}</Typography></Grid>
            <Grid className={classes.share} item xs={4}>
                {share ? <CopyField /> : <ShareButton />}
            </Grid>
            <Grid item xs={2}><SettingsButton /></Grid>
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
    </>

}
