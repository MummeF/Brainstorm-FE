import { Button, Dialog, DialogTitle, Grid } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";
import React, { useState } from "react";
import { VLD_MOD_PWD } from "../../tools/connections";
import { postStringToBackend } from "../../tools/fetching";
import PasswordInput from "../common/passwordInput";

interface Props {
    id: number;
    open: boolean;
    handleAbort(): void;
    handleSuccess(): void;
}

export default function ModAuthModal(props: Props) {
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
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const handleValidate = () => {
        postStringToBackend(VLD_MOD_PWD + '?roomId=' + props.id, password)
            .then(res => {
                if (res === true) {
                    setErrorText("")
                    props.handleSuccess();
                } else {
                    setErrorText("Falsches Passwort!");
                }
            })
    }
    const closeWithoutValidate = () => {
        setPassword("")
        setErrorText("")
        props.handleAbort();
    }

    return (<>
        <Dialog onKeyUp={(e) => {
            switch (e.keyCode) {
                case 13: //enter
                    handleValidate();
                    break;
            }
        }} onClose={closeWithoutValidate} aria-labelledby="simple-dialog-title" open={props.open}>
            <div className={classes.root}>
                <DialogTitle id="simple-dialog-title">Moderator Passwort eingeben, um Rechte anzufordern!</DialogTitle>
                <Grid container className={classes.body} direction="row" justify="space-between" spacing={2} alignItems="center">
                    <Grid item xs={9}>
                        <PasswordInput className={classes.bodyItem} errorText={errorText} password={password} onPasswordChange={(next) => setPassword(next)} />
                        <br />
                    </Grid>
                    <Grid item xs={3}>
                        <Button className={classes.bodyItem} variant="contained" color="primary" onClick={handleValidate}>Enter</Button>
                    </Grid>
                </Grid>
            </div>
        </Dialog>
    </>);
}