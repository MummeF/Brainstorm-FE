import React, { useState } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import CustomLoader from "../components/common/customLoader";
import RoomPaper from "../components/room/roomPaper";
import RoomModel from "../model/roomModel";
import { VAL_ROOM_ID, WS_SEND, WS_SUB } from "../tools/connections";
import { getJsonFromBackend } from "../tools/fetching";
import WebsocketService from "../tools/websocketService";

interface Props {
    id: number;
}
interface State {
    room?: RoomModel;
    updating: boolean;
    deleted: boolean;
}
class RoomRaw extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            updating: false,
            deleted: false
        }
    }
    private webSocketService?: WebsocketService;
    componentDidMount() {
        this.webSocketService = WebsocketService.getInstance();
        this.webSocketService.connect(
            () => {
                this.webSocketService &&
                    this.webSocketService.subscribe(
                        WS_SUB,
                        message => {
                            if (message.body) {
                                if (!message.body.includes('Success') && !message.body.includes('found')) {
                                    if (message.body.includes('deleted')) {
                                        this.setState({ deleted: true });
                                    } else {
                                        try {
                                            const room = JSON.parse(message.body);
                                            this.setState({ room: room })
                                        } catch{
                                            console.log("Parsing error");
                                        }
                                    }
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
        this.webSocketService &&
            this.webSocketService.sendMessage(
                WS_SEND,
                JSON.stringify({ roomId: roomId })
            );
    }

    render() {
        if (this.state.deleted) {
            return <>
                <Redirect to="/"></Redirect>
            </>
        }

        if (this.state.room) {
            return (<>
                <RoomPaper room={this.state.room!}></RoomPaper>
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