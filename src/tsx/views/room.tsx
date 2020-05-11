import React, { useState } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import CustomLoader from "../components/common/customLoader";
import RoomPaper from "../components/room/roomPaper";
import MRoom from "../model/roomModel";
import { VAL_ROOM_ID, WS_SEND, WS_SUB, GET_ROOM } from "../tools/connections";
import { getJsonFromBackend } from "../tools/fetching";
import WebsocketService from "../tools/websocketService";
import WebSocketResponse from "../model/websocket/webSocketResponse";

interface Props {
    id: number;
}
interface State {
    room?: MRoom;
    roomSet: boolean;
    deleted: boolean;
}
class RoomRaw extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            roomSet: false,
            deleted: false
        }
    }
    private webSocketService?: WebsocketService;
    componentDidMount() {
        getJsonFromBackend(GET_ROOM + '?roomId=' + this.props.id)
            .then(res => this.setState({ room: res, roomSet: true }));
        this.webSocketService = WebsocketService.getInstance();
        this.webSocketService.connect(
            () => {
                this.webSocketService &&
                    this.webSocketService.subscribe(
                        WS_SUB,
                        message => {
                            if (message.body) {
                                try {
                                    const response: WebSocketResponse = JSON.parse(message.body);
                                    // console.log("received " + response.type + " from websocket: ", response.content)
                                    switch (response.type) {
                                        case 'delete':
                                            this.setState({ deleted: true })
                                            break;
                                        case 'data':
                                            const room: MRoom = JSON.parse(response.content);
                                            this.setState({ room: room })
                                            break;
                                    }
                                } catch{
                                    console.error("Unable to parse body " + message.body)
                                }
                            }
                        }
                    );
                this.subscribe(this.props.id);
            },
            () => { },
            () => { }
        );
    }

    componentWillUnmount() {
        this.webSocketService?.disconnect();
    }

    private subscribe(roomId: number): void {
        this.webSocketService?.sendMessage(
            WS_SEND,
            JSON.stringify({ roomId: roomId })
        );
    }

    render() {
        if (this.state.deleted) {
            return <>
                <Redirect to="/roomClosed"></Redirect>
            </>
        }

        if (this.state.room) {
            return <>
                <RoomPaper room={this.state.room!}></RoomPaper>
            </>
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
                return <Redirect to="/enterRoom"></Redirect>
            }
        } else {
            return <CustomLoader></CustomLoader>;
        }
    } else {
        return <Redirect to="/enterRoom"></Redirect>
    }

}