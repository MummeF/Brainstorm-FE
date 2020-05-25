import React, { useState, useRef, useEffect } from "react";
import { Typography, Grid, Button, TextField, makeStyles, Paper, setRef } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import { getJsonFromBackend } from "../tools/fetching";
import { VAL_ROOM_ID } from "../tools/connections";
import { Redirect } from "react-router-dom";
import GlobalHint from "../components/common/globalHint";
import RoomList from "../components/room/RoomList";

interface Props {

}
interface State {
    verified: boolean;
    tried: boolean;
    alertOpen: boolean;
    roomId: string;
    invalidInput: boolean;
}

const regexp = new RegExp('^[0-9]{0,6}$');


export default function EnterRoom() {
    const [verified, setVerified] = useState(false);
    const [tried, setTried] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [invalidInput, setInvalidInput] = useState(false);
    const [roomId, setRoomId] = useState('');


    const isMobile = useRef(window.innerWidth < 480);
    useEffect(() => {
        setRef(isMobile, window.innerWidth < 480)
    })

    // const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            width: "80%",
            margin: "auto",
            marginTop: "2em",
            minHeight: "10em",
            padding: "1em",
        },
        idTextField: {
            textAlign: isMobile.current ? "right" : "left"
        }
    });
    const classes = useStyles();


    const checkInput = (eventValue: string) => {
        if (eventValue !== null) {
            if (regexp.test(eventValue)) {
                setInvalidInput(false);
                let roomId = eventValue;
                if (roomId !== '') {
                    getJsonFromBackend(VAL_ROOM_ID + '?roomId=' + roomId)
                        .then(res => {
                            setVerified(res);
                            setRoomId(res === true ? roomId : '');
                        })
                }
            } else {
                setInvalidInput(true);
            }
        }
    }

    if (tried && verified) {
        return (<Redirect
            to={{
                pathname: "/room/" + roomId
            }}
        />)
    } else {
        const onClose = () => {
            setAlertOpen(false);
        }
        if (tried && !verified) {
            setAlertOpen(true);
            setTried(false);
        }

        return (<>
            <GlobalHint open={alertOpen} timeout={3000} onClose={onClose} severity="error">Die eingegebene Raum-Id war nicht korrekt.</GlobalHint>
            <Grid container direction="row" justify="space-between">
                <Grid item xs={isMobile.current ? 12 : 8}><Typography variant="h3">Raum beitreten</Typography></Grid>
                {isMobile.current ? <br /> : <></>}
                <Grid item xs={isMobile.current ? 12 : 2} container direction="row" alignItems="flex-start" justify="space-around" spacing={1}>
                    <Grid item xs={9} className={classes.idTextField}> <TextField
                        size="small"
                        error={invalidInput}
                        helperText={invalidInput ? "Die Raum-ID besteht aus 6 Ziffern" : ""}
                        id="roomId"
                        label="Raum-ID"
                        variant="outlined"
                        onChange={event => checkInput(event.target.value)} /></Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="primary" onClick={() => setTried(true)} endIcon={<SendIcon></SendIcon>}>
                            Los
                    </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Paper className={classes.root}>
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        <Typography variant="h4">Öffentliche Räume</Typography>
                    </Grid>
                    <Grid item>
                        <RoomList />
                    </Grid>
                </Grid>
            </Paper>

        </>)
    }
}