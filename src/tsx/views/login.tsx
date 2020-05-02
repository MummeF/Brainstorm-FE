import React from "react";
import { Typography, Grid, Button, Paper, useTheme, makeStyles, TextField } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';



export default function Login() {

    return <>
        <Typography variant="h3">An Meeting teilnehmen</Typography>
        <br></br>
        <form noValidate autoComplete="off" action="http://localhost:3000/room">
            <TextField id="session" label="Meeting-ID eingeben" variant="outlined" />
            {/*<input id="session" type="submit" value="Los" />*/}
        </form>
        <br></br>
        <br></br>
        <Button variant="contained" color="primary" href="http://localhost:3000/room">
            Los
        </Button>
    </>
}