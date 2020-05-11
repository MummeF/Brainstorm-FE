import React from "react";



export default class Printable extends React.Component {
    render() {
        return <>
            {this.props.children}
        </>
    }
}