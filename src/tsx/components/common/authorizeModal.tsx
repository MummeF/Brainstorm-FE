import React, { useState } from "react";
import { Dialog, DialogTitle, Grid, TextField, Fab } from "@material-ui/core";
import classes from "*.module.css";
import makeStyles from "@material-ui/styles/makeStyles";
import { putAndGetJsonFromBackend, postStringToBackend } from "../../tools/fetching";
import { UPDT_CTRBT, VLD_PWD } from "../../tools/connections";
import PasswordInput from "./passwordInput";

interface Props {
    id: number;
    handleAbort(): void;
    handleSuccess(): void;
}

export default function AuthorizeModal(props: Props) {
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

    const [open, setOpen] = useState(true);

    const handleValidate = () => {
        postStringToBackend(VLD_PWD + '?roomId=' + props.id, password)
            .then(res => {
                if (res === true) {
                    props.handleSuccess();
                }else{
                    console.log(' pw falsch')
                }
            })
    }
    const closeWithoutValidate = () => {
        setOpen(false);
        setPassword("")
        props.handleAbort();
    }
    return (<>
        <Dialog onClose={closeWithoutValidate} aria-labelledby="simple-dialog-title" open={open}>
            <div className={classes.root}>
                <DialogTitle id="simple-dialog-title">Passwort eingeben</DialogTitle>
                <Grid container className={classes.body} direction="row" justify="space-between" alignItems="flex-end">
                    <PasswordInput password={password} onPasswordChange={(next)=> setPassword(next)} />
                </Grid>
            </div>
        </Dialog>
    </>);
}