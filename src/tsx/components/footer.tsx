import React from "react";
import { makeStyles, Grid, useTheme, Button, Typography } from "@material-ui/core";


import HomeIcon from '@material-ui/icons/Home';
import { NavLink } from "react-router-dom";

export default function Footer() {
    const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            position: "fixed",
            backgroundColor: theme.palette.grey[400],
            bottom: 0,
            paddingRight: "10em",
            width: "100%",
            color: theme.palette.grey[700],
        },
        footer: {
            textAlign: "center",
        },
        footerText:{
            textAlign: "right",
            paddingRight: "1em",
        }
    });

    const classes = useStyles();

    return <React.Fragment>
        <div className={classes.root}>
            <Grid container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={3}
            >
                <Grid item xs className={classes.footer}>
                    <Button color="primary" variant="text" startIcon={<HomeIcon />} component={NavLink} to="/">Home</Button>
                </Grid>
                <Grid item xs className={classes.footer}>
                    <Button color="primary" variant="text" startIcon={<HomeIcon />} component={NavLink} to="/contact">Kontakt</Button>
                </Grid>
                <Grid item xs className={classes.footer}>
                    <Button color="primary" variant="text" startIcon={<HomeIcon />} component={NavLink} to="/login">Login</Button>
                </Grid>
                <Grid item xs className={classes.footer}>
                    <Button color="primary" variant="text" startIcon={<HomeIcon />} component={NavLink} to="/createSession">Session erstellen</Button>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={6} className={classes.footerText}> <Typography variant="h6">© 2020 Brainstorm &nbsp;</Typography></Grid>
            </Grid>
        </div>
    </React.Fragment>
}