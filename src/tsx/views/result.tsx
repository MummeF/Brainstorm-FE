import React from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import CustomLoader from "../components/common/customLoader";
import ResultPaper from "../components/room/result/resultPaper";
import MRoom from "../model/roomModel";
import { HIST_GET_ROOM } from "../tools/connections";
import { getJsonFromBackend } from "../tools/fetching";

interface Props {
    id: number;
}
interface State {
    room?: MRoom;
    roomAuthorized: boolean;
    roomSet: boolean;
    deleted: boolean;
    authorizing: boolean;
    authorizeAborted: boolean;
    redirect: boolean;
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
            redirect: false,
        }
    }
    componentDidMount() {
        getJsonFromBackend(HIST_GET_ROOM + '?roomId=' + this.props.id)
            .then(res => {
                if (res === null) {
                    this.setState({ redirect: true });
                } else {
                    this.setState({ room: res });
                }
            })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        if (this.state.room) {
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

    if (match.params) {
        let id: string = match.params.id;

        return <ResultRaw id={+id}></ResultRaw>
    }
    return <Redirect to="/" />;
} 