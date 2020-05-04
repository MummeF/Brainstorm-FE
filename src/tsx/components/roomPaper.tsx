import React from "react";
import RoomModel from "../model/roomModel";
import { Typography, makeStyles, Paper, Grid, Button } from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsModal from "./settingsModal";

interface Props {
    room: RoomModel
}

interface State {
    settingsOpen: boolean;
}

export default class RoomPaper extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            settingsOpen: false,
        }
    }

    render() {
        const handleClose = () => {
            this.setState({ settingsOpen: false })
        }
        const handleOpen = () => {
            this.setState({ settingsOpen: true })
        }
        const room = this.props.room;
        console.log(this.props.room)
        return (<>
            <SettingsModal open={this.state.settingsOpen} room={this.props.room} handleClose={handleClose}></SettingsModal>
            <Grid container justify="space-between" direction="row">
                <Grid item><Typography variant="h3">Raum{' ' + (room.topic ? room.topic : room.id)}</Typography></Grid>
                <Grid item><Button variant="text" color="primary" endIcon={<SettingsIcon />} onClick={handleOpen}>Raum bearbeiten</Button></Grid>
            </Grid>
            <RootPaper></RootPaper>
        </>);
    }
}

const RootPaper: React.StatelessComponent = props => {
    // const theme = useTheme();

    const useStyles = makeStyles({
        root: {
            margin: "auto",
            width: "80%",
            minHeight: "10em",
        },
    });
    const classes = useStyles();
    return (<>
        <Paper elevation={1} className={classes.root}>
            {props.children}
        </Paper>
    </>);
}