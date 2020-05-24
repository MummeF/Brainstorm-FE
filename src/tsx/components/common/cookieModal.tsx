import { Button, Dialog, DialogActions, DialogContentText, DialogTitle, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import { useCookies } from 'react-cookie';


const CookieModal: React.FunctionComponent = () => {
    // const [open, setOpen] = React.useState(true);
    const [cookies, setCookie] = useCookies(['cookieAccepted']);
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
    });
    const classes = useStyles();

    if (cookies.cookieAccepted) {
        return null;
    } else {
        return (
            <Dialog aria-labelledby="simple-dialog-title" open={cookies.cookieAccepted ? false : true}>
                <div className={classes.root}>
                    <DialogTitle id="simple-dialog-title">Cookies</DialogTitle>
                    <div className={classes.body}>
                        <DialogContentText>
                            <Typography variant="body1">Wir nutzen Cookies! Stimmen Sie dem zu, um diese Webseite nutzen zu können.</Typography>
                            <Typography variant="caption">Die Cookies werden genutzt, um Räume den Erstellern zuordnen zu können.</Typography>
                        </DialogContentText>
                    </div>
                    <DialogActions>
                        <Button startIcon={<CheckIcon />} onClick={() => setCookie('cookieAccepted', true, { sameSite: "lax", path: "/" })} color="primary" variant="contained">Akzeptieren</Button>
                    </DialogActions>
                </div>
            </Dialog>);
    }

}

export default CookieModal;