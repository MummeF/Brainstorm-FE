import React from "react";
import { Typography, Grid, Button, Paper, useTheme, makeStyles, TextField } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';



export default function Login() {

    return <>
        <Typography variant="h3">An Meeting teilnehmen</Typography>
        <br></br>
<<<<<<< HEAD
        <form noValidate autoComplete="off">
            <TextField id="session" label="Raum-ID eingeben" variant="outlined" />
=======
        <form noValidate autoComplete="off" action="http://localhost:3000/room">
            <TextField id="session" label="Meeting-ID eingeben" variant="outlined" />
            {/*<input id="session" type="submit" value="Los" />*/}
>>>>>>> 11326b2b01d39f53be3e596e6d2af6581330090c
        </form>
        <br></br>
        <br></br>
        <Button variant="contained" color="primary" href="http://localhost:3000/room">
            Los
        </Button>
    </>
}