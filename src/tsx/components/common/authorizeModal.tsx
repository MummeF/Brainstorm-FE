import { Button, Dialog, DialogTitle, Grid } from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";
import React, { useState } from "react";
import { VLD_PWD } from "../../tools/connections";
import { postStringToBackend } from "../../tools/fetching";
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
    const [errorText, setErrorText] = useState("");

    const [open, setOpen] = useState(true);

    const handleValidate = () => {
        postStringToBackend(VLD_PWD + '?roomId=' + props.id, password)
            .then(res => {
                if (res === true) {
                    props.handleSuccess();
                } else {
                    setErrorText("Falsches Passwort!");
                }
            })
    }
    const closeWithoutValidate = () => {
        setOpen(false);
        setPassword("")
        props.handleAbort();
    }

    const keyHandler = (event: KeyboardEvent) => {
        if (event.keyCode === 13) { // ENTER
            handleValidate();
        }
    }

    React.useEffect(() => {
        document.addEventListener("keydown", keyHandler)
        return () => {
            document.removeEventListener("keydown", keyHandler)
        }
    })
    return (<>
        <Dialog onClose={closeWithoutValidate} aria-labelledby="simple-dialog-title" open={open}>
            <div className={classes.root}>
                <DialogTitle id="simple-dialog-title">Passwort eingeben</DialogTitle>
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