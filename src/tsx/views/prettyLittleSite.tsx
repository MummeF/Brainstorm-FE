

import React from "react";
import { Typography } from "@material-ui/core";


interface Props {
    start: number;
}

interface State {
    actCounter: number;
}


export default class PrettyLittleSite extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            actCounter: this.props.start
        }
    }
    componentDidMount() {
        this.setState({ actCounter: this.state.actCounter + 1 })
    }

    render() {

        return <Typography variant="h1"> Hello, act counter: {this.state.actCounter}, we started with:{this.props.start}</Typography>
    }
}