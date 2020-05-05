import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";


import HomeIcon from '@material-ui/icons/Home';

export default class Header extends React.Component {

    render() {
        return <>
            <AppBar position="sticky">
                <Toolbar>
                    <Button color="primary" variant="text" startIcon={<HomeIcon />} component={NavLink} to="/">Home</Button>
                </Toolbar>
            </AppBar>
        </>
    }
}