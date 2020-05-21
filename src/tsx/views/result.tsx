import React, { useState } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import CustomLoader from "../components/common/customLoader";
import ResultPaper from "../components/room/result/resultPaper";
import MRoom from "../model/roomModel";
import { HIST_GET_ROOM, VAL_ROOM_ID } from "../tools/connections";
import { getJsonFromBackend } from "../tools/fetching";

interface Props {
    id: number;
    authorizationNeeded: boolean;
}
interface State {
    room?: MRoom;
    roomAuthorized: boolean;
    roomSet: boolean;
    deleted: boolean;
    authorizing: boolean;
    authorizeAborted: boolean;
}
class ResultRaw extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            roomSet: false,
            roomAuthorized: false,
            deleted: false,
            authorizing: false,
            authorizeAborted: false,
        }
    }
    componentDidMount() {
        getJsonFromBackend(HIST_GET_ROOM + '?roomId=' + this.props.id)
            .then(res => this.setState({ room: res }))
    }

    render() {
        if (this.state.room) {
            console.log(this.state.room)
            return <>
                <ResultPaper room={this.state.room!}></ResultPaper>
            </>
        } else {
            return <CustomLoader></CustomLoader>
        }
    }
}

type TParams = { id: string }


export default function Result({ match }: RouteComponentProps<TParams>) {
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
                return <ResultRaw authorizationNeeded={true} id={+id}></ResultRaw>
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