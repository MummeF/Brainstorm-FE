import React, { useState } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import AuthorizeModal from "../components/common/authorizeModal";
import CustomLoader from "../components/common/customLoader";
import RoomPaper from "../components/room/roomPaper";
import MRoom from "../model/roomModel";
import WebSocketResponse from "../model/websocket/webSocketResponse";
import { GET_ROOM, HAS_PWD, VAL_ROOM_ID, WS_SUB, WS_TPC, WS_UNSUB, VAL_MOD_ID } from "../tools/connections";
import { getJsonFromBackend } from "../tools/fetching";
import WebsocketService from "../tools/websocketService";
import { useCookies } from "react-cookie";

interface Props {
    id: number;
    modId: string;
}
interface State {
    room?: MRoom;
    roomAuthorized: boolean;
    roomSet: boolean;
    deleted: boolean;
    authorizing: boolean;
    authorizeAborted: boolean;
    isMod: boolean;
}
class RoomRaw extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            roomSet: false,
            roomAuthorized: false,
            deleted: false,
            authorizing: false,
            authorizeAborted: false,
            isMod: false,
        }
    }
    private webSocketService?: WebsocketService;
    connect = () => {
        this.webSocketService?.connect(
            () => {
                this.webSocketService &&
                    this.webSocketService.subscribe(
                        WS_TPC,
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
                                        case 'mod-update':
                                            getJsonFromBackend(VAL_MOD_ID + '?roomId=' + this.props.id + '&moderatorId=' + this.props.modId)
                                                .then(res => {
                                                    this.setState({ isMod: res })
                                                })
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
            () => {
                this.webSocketService?.sendMessage(WS_UNSUB,
                    JSON.stringify({ roomId: this.props.id }))
            },
            () => { }
        );
    }



    componentDidMount() {
        getJsonFromBackend(HAS_PWD + '?roomId=' + this.props.id)
            .then(res => this.setState({ roomAuthorized: !res, authorizing: res }));
        getJsonFromBackend(VAL_MOD_ID + '?roomId=' + this.props.id + '&moderatorId=' + this.props.modId)
            .then(res => {
                this.setState({ isMod: res })
            })
    }

    initWebSocket() {
        window.onbeforeunload = () => {
            this.webSocketService?.disconnect();
            setTimeout(() => this.connect(), 2000); // Just in case that the confirm window appears and the user clicks 'cancel'
            return null;
        }
        getJsonFromBackend(GET_ROOM + '?roomId=' + this.props.id)
            .then(res => this.setState({ room: res, roomSet: true }));
        this.webSocketService = WebsocketService.getInstance();
        this.connect();
    }

    componentWillUnmount() {
        this.webSocketService?.disconnect();
    }

    private subscribe(roomId: number): void {
        this.webSocketService?.sendMessage(
            WS_SUB,
            JSON.stringify({ roomId: roomId })
        );
    }

    render() {
        if (!this.state.authorizing && this.state.roomAuthorized && !this.webSocketService) {
            this.initWebSocket();
        }
        if (this.state.deleted) {
            return <>
                <Redirect to="/roomClosed"></Redirect>
            </>
        }
        if (this.state.authorizeAborted) {
            return <Redirect to="/enterRoom" />
        }
        if (!this.state.roomAuthorized && this.state.authorizing) {
            if (this.state.isMod) {
                this.setState({ roomAuthorized: true, authorizing: false });
            } else {
                return <AuthorizeModal id={this.props.id} handleAbort={() => this.setState({ authorizeAborted: true })} handleSuccess={() => this.setState({ roomAuthorized: true, authorizing: false })}></AuthorizeModal>
            }
        }
        if (this.state.room) {
            if (this.state.room.state === 'DONE') {
                return <Redirect to={'/result/' + this.state.room.id} />
            }
            return <>
                <RoomPaper isMod={this.state.isMod} room={this.state.room!}></RoomPaper>
            </>
        } else {
            return <CustomLoader></CustomLoader>
        }
    }
}

type TParams = { id: string }


export default function Room({ match }: RouteComponentProps<TParams>) {
    const [verified, setVerified] = useState(-1);
    const [cookies] = useCookies(['modId']);

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
                return <RoomRaw modId={cookies.modId} id={+id}></RoomRaw>
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