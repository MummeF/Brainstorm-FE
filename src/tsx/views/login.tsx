import React from "react";
import { Typography, Grid, Button, TextField } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import { getJsonFromBackend } from "../tools/fetching";
import { VAL_ROOM_ID } from "../tools/connections";
import { Redirect } from "react-router-dom";

interface Props {

}
interface State {
    verified: boolean;
    tried: boolean;
    roomId: string;
}



export default class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            verified: false,
            tried: false,
            roomId: '',
        }
    }

    checkInput(eventValue: string) {
        if (eventValue !== null) {
            let roomId = eventValue;
            if (roomId !== '') {
                getJsonFromBackend(VAL_ROOM_ID + '?roomId=' + roomId)
                    .then(res => this.setState({ verified: res, roomId: res === true ? roomId : '' }));
            }
        }
    }

    render() {
        if (this.state.tried && this.state.verified) {
            return (<Redirect
                to={{
                    pathname: "/room/" + this.state.roomId
                }}
            />)
        } else {
            return (<>
                <Typography variant="h3">Einem Raum beitreten</Typography>
                <br />
                <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item> <TextField id="roomId" label="Raum-ID eingeben" variant="outlined" onChange={event => this.checkInput(event.target.value)} /></Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={() => this.setState({ tried: true })} endIcon={<SendIcon></SendIcon>}>
                            Los
                    </Button>
                    </Grid>
                </Grid>
            </>)
        }
    }
}