import React from "react";
import { Typography, TextField, Button } from "@material-ui/core";




export default function CreateRoom() {
    return <>
        <Typography variant="h3"> Raum erstellen</Typography>
        <br></br>
        <Button variant="contained" color="primary" href="#contained-buttons">
            Raum erstellen
        </Button>
    </>
}