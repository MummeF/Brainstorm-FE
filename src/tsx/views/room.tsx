import React, { useState } from "react";
import { getJsonFromBackend } from "../tools/fetching";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { VAL_ROOM_ID, GET_ROOM } from "../tools/connections";
import CustomLoader from "../components/customLoader";
import RoomModel from "../model/roomModel";
import RoomPaper from "../components/roomPaper";

interface Props {
    id: number;
}
interface State {
    room?: RoomModel;
    updating: boolean;
}
class RoomRaw extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            updating: false
        }
    }

    componentDidMount() {
        //fetch room data
        this.updateRoom();
    }
    componentDidUpdate() {
        // //fetch room data
        getJsonFromBackend(GET_ROOM + '?roomId=' + this.props.id)
            .then(room => this.setState({ room }))
    }
    updateRoom() {
        getJsonFromBackend(GET_ROOM + '?roomId=' + this.props.id)
            .then(room => this.setState({ room }));
    }

    render() {
        if (this.state.room) {
            return (<>
                <RoomPaper updateRoom={this.updateRoom.bind(this)} room={this.state.room!}></RoomPaper>
            </>);
        } else {
            return <CustomLoader></CustomLoader>
        }

    }
}





















type TParams = { id: string }


export default function Room({ match }: RouteComponentProps<TParams>) {
    const [verified, setVerified] = useState(-1);

    if (match.params) {
        let id: string = match.params.id;

        getJsonFromBackend(VAL_ROOM_ID + '?roomId=' + id)
            .then(res => {
                if (res === true) {
                    setVerified(1);
                } else {
                    setVerified(0);
                }
            });
        if (verified !== -1) {
            if (verified === 1) {
                return <RoomRaw id={+id}></RoomRaw>
            } else {
                return <Redirect to={{ pathname: '/login' }}></Redirect>
            }
        } else {
            return <CustomLoader></CustomLoader>;
        }
    } else {
        return <Redirect to={{ pathname: '/login' }}></Redirect>
    }

}