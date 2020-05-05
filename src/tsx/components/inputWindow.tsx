import React from "react";
import RoomModel from "../model/roomModel";
import { Typography, makeStyles, Paper, Grid, Button, Fab } from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsModal from "./settingsModal";
import InputModal from "./inputModal";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

interface Props {
    room: RoomModel
    updateRoom(): void;
}

interface State {
    inputOpen: boolean;
}

export default class inputWindow extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            inputOpen: false,
        }
    }

    render() {
        const handleClose = () => {
            this.setState({ inputOpen: false })
        }
        const handleOpen = () => {
            this.setState({ inputOpen: true })
        }
        const room = this.props.room;
        return (<>
            <InputModal updateParentRoom={this.props.updateRoom} open={this.state.inputOpen} room={this.props.room} handleClose={handleClose}></InputModal>
            <Grid>
                <Grid item>
                    <Fab variant="extended" color="primary" aria-label="add" onClick={handleOpen}>
                        <AddIcon />
                        Beitrag hinzufügen
                    </Fab>
                </Grid>
            </Grid>
        </>);
    }
}

/*
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
}*/