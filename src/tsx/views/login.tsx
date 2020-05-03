import React from "react";
import { Typography, TextField } from "@material-ui/core";


export default function Login() {
    return <>
        <Typography variant="h3"> Login Seite</Typography>
        <br></br>
        <form noValidate autoComplete="off">
            <TextField id="session" label="Raum-ID eingeben" variant="outlined" />
        </form>
    </>
}