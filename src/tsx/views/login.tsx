import React, { useState } from "react";
import { Typography, Grid, Button, TextField, makeStyles } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import { getJsonFromBackend } from "../tools/fetching";
import { VAL_ROOM_ID } from "../tools/connections";
import { Redirect } from "react-router-dom";
import GlobalHint from "../components/common/globalHint";

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


export default function Login() {
    const [verified, setVerified] = useState(false);
    const [tried, setTried] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [invalidInput, setInvalidInput] = useState(false);
    const [roomId, setRoomId] = useState('');
    // const theme = useTheme();

    const useStyles = makeStyles({
        btn: {
            marginTop: "0.5em"
        },
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
            <Typography variant="h3">Einem Raum beitreten</Typography>
            <br />
            <Grid container direction="row" alignItems="flex-start" spacing={2}>
                <Grid item> <TextField error={invalidInput}
                    helperText={invalidInput ? "Die Raum-ID besteht aus 6 Ziffern" : ""}
                    id="roomId"
                    label="Raum-ID eingeben"
                    variant="outlined"
                    onChange={event => checkInput(event.target.value)} /></Grid>
                <Grid item>
                    <Button  className={classes.btn} variant="contained" color="primary" onClick={() => setTried(true)} endIcon={<SendIcon></SendIcon>}>
                        Los
                    </Button>
                </Grid>
            </Grid>
            {alertOpen ? <GlobalHint timeout={3000} onClose={onClose} severity="error">Die eingegebene Raum-Id war nicht korrekt.</GlobalHint> : <></>}
        </>)
    }
}