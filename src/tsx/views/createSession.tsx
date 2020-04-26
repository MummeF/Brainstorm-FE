import React from "react";
import { Typography, TextField, Button } from "@material-ui/core";


export default function CreateSession() {
    return <>
        <Typography variant="h3"> Session erstellen</Typography>
        <br></br>
        <Button variant="contained" color="primary" href="#contained-buttons">
            Session erstellen
        </Button>
    </>
}