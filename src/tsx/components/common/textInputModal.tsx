import { Dialog, DialogTitle, Fab, Grid, makeStyles, TextField } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import React from "react";

interface Props {
    open: boolean;
    value: string;
    title: string;
    helperText: string;
    onChange(event: React.ChangeEvent<HTMLDivElement | HTMLTextAreaElement>): void;
    onClose(): void;
    closeOnSend?: boolean;
    onSend(): void;
}

export default function TextInputModal(props: Props) {
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
  
    const closeAndSend = () => {
        if(props.closeOnSend){
            props.onClose();
        }
        props.onSend();
    }

    return (
        <Dialog
            onKeyUp={(e) => {
                switch (e.keyCode) {
                    case 13: //enter
                        closeAndSend();
                        break;
                }
            }}
            onClose={props.onClose}
            aria-labelledby="simple-dialog-title"
            open={props.open}>
            <div className={classes.root}>
                <DialogTitle id="simple-dialog-title">Neuer Beitrag</DialogTitle>
                <Grid container className={classes.body} direction="row" justify="space-between" alignItems="flex-end">
                    <Grid item xs><TextField
                        value={props.value}
                        onChange={props.onChange}
                        className={classes.bodyItem}
                        label="Hier Beitrag eingeben"></TextField></Grid>
                    <Grid item xs={1}>
                        <Fab size="small" onClick={closeAndSend} color="primary" aria-label="send">
                            <SendIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </div>
        </Dialog>

    );

}