import { Button, Fab, Grid, IconButton, makeStyles, Paper, setRef, TextField, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GavelIcon from '@material-ui/icons/Gavel';
import SettingsIcon from '@material-ui/icons/Settings';
import ShareIcon from '@material-ui/icons/Share';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import CopyToClipboard from 'react-copy-to-clipboard';
import { Redirect } from "react-router-dom";
import { v4 as generateRndModId } from 'uuid';
import MRoom from "../../model/roomModel";
import { INC_STT, SET_MOD_ID } from "../../tools/connections";
import { getJsonFromBackend } from "../../tools/fetching";
import StyledMessage from "../common/styledMessage";
import YesNoOption from "../common/yesNoOption";
import Contribution from "./contribution/contribution";
import ContributionModal from "./contribution/contributionModal";
import ModAuthModal from "./ModAuthModal";
import SettingsModal from "./settingsModal";

interface Props {
    room: MRoom,
    isMod: boolean
}


export default function RoomPaper(props: Props) {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [contributionOpen, setContributionOpen] = useState(false);
    const [modAuthOpen, setModAuthOpen] = useState(false);
    const [confirmEditOpen, setConfirmEditOpen] = useState(false);
    const [confirmDoneOpen, setConfirmDoneOpen] = useState(false)

    const [share, setShare] = useState(false);
    const [copied, setCopied] = useState(false);
    const updateState = useCallback(() => {
        switch (props.room.state) {
            case "CREATE":
                return 0;
            case "EDIT":
                return 1;
            case "DONE":
                return 2;
        }
    }, [props])

    const [state, setState] = useState(updateState())

    const [cookies, setCookie] = useCookies(['modId']);

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
        },
        stateField: {
            textAlign: "right",
            width: "100%"
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
    const handleModAuthClose = () => {
        setModAuthOpen(false)
    }
    const handleModAuthOpen = () => {
        setModAuthOpen(true)
    }

    const isMobile = useRef(window.innerWidth < 480);
    useEffect(() => {
        setRef(isMobile, window.innerWidth < 480)
    })
    const setModId = () => {
        if (!cookies.modId) {
            const modId: string = generateRndModId();
            setCookie('modId', modId, { sameSite: "lax", path: "/" });
        }
    }


    useEffect(() => {
        setState(updateState());
    }, [props.room, updateState])
    const room = props.room;

    const subjects: string[] = [...new Set(props.room.contributions.map(cont => cont.subject))].filter(Boolean);

    let prevSubject: string = "";
    const contributions: JSX.Element[] = room.contributions?.sort((a, b) => {
        if (!a.subject || !b.subject) {
            return 0;
        }
        return a.subject.toLowerCase().localeCompare(b.subject.toLowerCase());
    })
        .map(cont => {
            let Subject = () => { return <></> };
            if (prevSubject !== cont.subject) {
                prevSubject = cont.subject;
                Subject = () => {
                    return <Grid item xs={12}>
                        <Typography variant="h4">{cont.subject ? cont.subject : "Kein Titel zugeordnet"}</Typography>
                    </Grid>
                }
            }
            return <>
                <Subject />
                <Grid item key={cont.id} className={classes.contribution} xs={isMobile.current ? 12 : 6}>
                    <Contribution subjects={subjects} roomState={state} roomId={room.id} contribution={cont}></Contribution>
                </Grid>
            </>
        }
        );

    const ConfirmNextStateModal = () => {
        if (state === 0) {
            return <YesNoOption
                open={confirmEditOpen}
                title="Bist Du sicher?"
                question="Möchtest du in die Edit-Phase wechseln?"
                severity="info"
                yesFilled
                onNoOption={() => setConfirmEditOpen(false)}
                onYesOption={() => {
                    setConfirmEditOpen(false);
                    increaseState();
                }} />
        } else if (state === 1) {
            return <YesNoOption
                open={confirmDoneOpen}
                title="Bist Du sicher?"
                question="Möchtest du in die Ergebnis-Phase wechseln?"
                severity="info"
                yesFilled
                onNoOption={() => setConfirmDoneOpen(false)}
                onYesOption={() => {
                    setConfirmDoneOpen(false);
                    increaseState();
                }} />
        } else {
            return null;
        }
    }

    const SettingsButton = () => {
        if (props.isMod) {
            if (isMobile.current) {
                return <IconButton aria-label="settingsbutton" onClick={handleSettingsOpen}><SettingsIcon /></IconButton>
            } else {
                return <Button variant="text" color="primary" endIcon={<SettingsIcon />} onClick={handleSettingsOpen}>Raum bearbeiten</Button>
            }
        } else {
            if (isMobile.current) {
                return <IconButton aria-label="settingsbutton" onClick={handleModAuthOpen}><GavelIcon /></IconButton>
            } else {
                return <Button variant="text" color="primary" endIcon={<GavelIcon />} onClick={handleModAuthOpen}>Moderator anfordern</Button>
            }
        }
    }

    const ShareButton = () => {
        if (isMobile.current) {
            return <IconButton aria-label="shareIcon" onClick={() => setShare(true)}><ShareIcon /></IconButton>
        } else {
            return <Button startIcon={<ShareIcon />} variant="text" color="secondary" onClick={() => setShare(true)}>Link Teilen</Button>
        }
    }

    const CopyButton = () => {
        if (copied) {
            return <Button startIcon={<CheckIcon />} variant="text" color="secondary">Kopiert</Button>;
        } else {
            return <CopyToClipboard text={window.location.href} onCopy={() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                    setShare(false);
                }, 2000);
            }}>
                <Button variant="text" color="secondary" startIcon={<FileCopyIcon />}>Link kopieren</Button>
            </CopyToClipboard>
        }
    }

    const CopyField = () => {
        return <>
            {isMobile.current ? <></> : <TextField className={classes.linkInput} size="small" variant="outlined" disabled value={window.location.href}></TextField>}
            <CopyButton />
        </>
    }

    const increaseState = () => {
        getJsonFromBackend(INC_STT + '?roomId=' + props.room.id);
    }
    const setNextState = () => {
        if (state === 0) {
            setConfirmEditOpen(true);
        } else if (state === 1) {
            setConfirmDoneOpen(true);
        }
    }

    const StateField = () => {

        switch (state) {
            case 0:
                return <Grid container justify="flex-end" alignItems="center" spacing={isMobile.current ? 0 : 3} direction="row">
                    <Grid item>
                        <Typography variant="h5">{isMobile.current ? 'Create' : 'Create-Phase!'}</Typography>
                    </Grid>
                    {props.isMod ?
                        <Grid item>
                            {isMobile.current ? <IconButton onClick={setNextState} ><SkipNextIcon /></IconButton>
                                : <Button endIcon={<SkipNextIcon />} color="primary" size="small" variant="contained" onClick={setNextState}>Next</Button>
                            }
                        </Grid>
                        : <></>}
                </Grid>
            case 1:
                return <Grid container justify="flex-end" alignItems="center" spacing={isMobile.current ? 0 : 3} direction="row">
                    <Grid item>
                        <Typography variant="h5">{isMobile.current ? 'Edit' : 'Edit-Phase!'}</Typography>
                    </Grid>
                    {props.isMod ?
                        <Grid item>
                            {isMobile.current ? <IconButton onClick={setNextState} ><SkipNextIcon /></IconButton>
                                : <Button endIcon={<SkipNextIcon />} color="primary" size="small" variant="contained" onClick={setNextState}>Next</Button>
                            }
                        </Grid>
                        : <></>}
                </Grid>
            case 2:
                return <Redirect to={"/result/" + props.room.id} />
        }
        return <></>;
    }

    return <>
        <SettingsModal open={settingsOpen} room={props.room} handleClose={handleSettingsClose}></SettingsModal>
        <ContributionModal roomId={room.id} open={contributionOpen} handleClose={handleContsClose}></ContributionModal>
        <ModAuthModal open={modAuthOpen} id={room.id} handleSuccess={async () => {
            handleModAuthClose();
            await setModId();
            getJsonFromBackend(SET_MOD_ID + '?roomId=' + props.room.id + '&moderatorId=' + cookies.modId);
        }} handleAbort={handleModAuthClose} />
        <ConfirmNextStateModal />

        <Grid container justify="space-between" direction="row">
            <Grid item xs={6}><Typography variant="h3">{(room.topic ? room.topic : ('Raum ' + room.id))}</Typography></Grid>
            <Grid className={classes.share} item xs={4}>
                {share ? <CopyField /> : <ShareButton />}
            </Grid>
            <Grid item xs={2}><SettingsButton /></Grid>
        </Grid>


        <Grid container justify="space-between" direction="row">
            <Grid item xs={6}>
                <Typography variant="body1">{props.room.description}</Typography>
            </Grid>
            <Grid className={classes.stateField} item xs={6}>
                <StateField />
            </Grid>
        </Grid>

        <br />
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
