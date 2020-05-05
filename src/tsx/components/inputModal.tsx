import React from "react";
import RoomModel from "../model/roomModel";
import { Typography, TextField } from "@material-ui/core";
import { StyledModal } from "./styledModal";
import { updateRoom, getJsonFromBackend } from "../tools/fetching";
import { GET_ROOM } from "../tools/connections";

interface Props {
    open: boolean;
    handleClose(): void;
    room: RoomModel;
    updateParentRoom(): void;
}

interface State {
    input: string;
}

export default class InputModal extends React.Component<Props, RoomModel> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        //fetch room data
        getJsonFromBackend(GET_ROOM + '?roomId=' + this.props.room.id)
            .then(room => this.setState({ topic: room.topic }));
    }

    render() {
        const body = (<>
            <br></br>
            <Typography variant="body2">Gib hier deinen Beitrag ein:</Typography>
            <br></br>
            <TextField id="topic" variant="outlined" size="small" onChange={event => {
                if (this.state) {
                    this.setState({ input: event.target.value })
                }
            }
            } />
        </>)
        return (
            <>
                <StyledModal open={this.props.open} body={body} handleClose={() => {
                    updateRoom(this.state)
                    this.props.updateParentRoom();
                    this.props.handleClose();
                }} title="Beitrag hinzufügen"></StyledModal>
            </>);
    }
}