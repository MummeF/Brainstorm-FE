import { Button, Grid, makeStyles, Paper, Typography, useTheme } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import GroupIcon from '@material-ui/icons/Group';
import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import YesNoOption from "../components/common/yesNoOption"


export default function Home() {

    const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            margin: "auto",
            width: "80%",
        },
        button: {
            backgroundColor: theme.palette.grey[300],
            width: "100%",
            minHeight: "3em"
        },
        btnPaper: {
            width: "60%",
            margin: "auto",
            padding: ".5em"
        },

    });
    const classes = useStyles();

    const isMobile = useRef(window.innerWidth < 480);

    return <>
        <div className={classes.root}>
            <Typography variant="h3"> Willkommen bei Brainstorm!</Typography>
            <br />
            <br />
            <Typography variant="body1">Erstelle einen Raum, oder tritt einem bei!</Typography>
            <br />
            <br />
            <Paper elevation={1} className={classes.btnPaper}>
                <Grid container spacing={3}>
                    <Grid item xs={isMobile.current ? 12 : 6}>
                        <Button color="primary" className={classes.button} variant="text" startIcon={<GroupIcon />} component={NavLink} to="/login">Raum beitreten</Button>
                    </Grid>
                    <Grid item xs={isMobile.current ? 12 : 6}>
                        <Button color="primary" className={classes.button} variant="text" startIcon={<AddIcon />} component={NavLink} to="/createRoom">Raum erstellen</Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>

    </>
}