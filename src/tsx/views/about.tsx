import { Typography, Paper, makeStyles } from "@material-ui/core";
import React from "react";


export default function About() {
    const useStyles = makeStyles({
        root: {
            width: "80%",
            padding: "1em"
        },
    });
    const classes = useStyles();
    return <>
        <Typography variant="h3"> Über uns</Typography>
        <br />
        <Typography variant="body1">Wir sind eine Gruppe von Informatikstudenten aus der Dualen Hochschule Baden-Württemberg.
        <br /> Dieses Projekt entstand im Rahmen einer Arbeit im Modul &quot;Web-Engineering II&quot;, welches Inhalt des 4. Semesters war.</Typography>
        <br />
        <Paper className={classes.root}>
            <Typography variant="h6">Kontakt</Typography>

            <Typography variant="body1">Bei Anregungen oder Fragen wenden Sie sich gerne an Felix Mumme (felix.mumme@daimler.com)</Typography>
        </Paper>

    </>
}

