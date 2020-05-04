import React from "react";
import { Typography } from "@material-ui/core";
import getFromBackend from "../tools/fetching";

interface Props {
    id: number;
}
interface State {
    id: number;
    thema?: string;
}
export default class Room extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            id: this.props.id,
        }
    }

    componentDidMount(){
        //fetch room data
    }


    render() {
        return (<>
            <Typography variant="h3">Raum{' ' + this.state.id}</Typography>
        </>);
    }
}