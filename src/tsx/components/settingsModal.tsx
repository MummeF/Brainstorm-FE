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


export default class SettingsModal extends React.Component<Props, RoomModel> {
    constructor(props: Props) {
        super(props);
        this.state = this.props.room;
    }

    componentDidMount() {
        //fetch room data
        getJsonFromBackend(GET_ROOM + '?roomId=' + this.props.room.id)
            .then(room => this.setState({ topic: room.topic }));
    }

    render() {
        const body = (<>
            <Typography variant="h4">Thema</Typography>
            <Typography variant="body2">Lege ein Thema für diesen Raum fest!</Typography>
            <TextField id="topic" variant="outlined" size="small" value={this.state?.topic} onChange={event => {
                if (this.state) {
                    this.setState({ topic: event.target.value })
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
                }} title="Settings"></StyledModal>
            </>);
    }
}