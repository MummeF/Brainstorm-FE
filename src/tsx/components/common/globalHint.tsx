import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles } from '@material-ui/core';
import Alert, { Color } from '@material-ui/lab/Alert';


export interface IGlobalHintProps {
    severity: Color;
    onClose?(): void;
    timeout?: number;
    children?: React.ReactNode;
}

const styles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "fixed",
            width: "100%",
            top: 0,
            left: 0,
            zIndex: 9999,
        }
    })
);

const GlobalHint: React.FunctionComponent<IGlobalHintProps> = (props: IGlobalHintProps) => {
    const classes = styles();
    if (props.timeout && props.onClose) {
        setTimeout(() => props.onClose!(), props.timeout)
    }
    return (
        <>
            <div className={classes.root}>
                <Alert onClose={props.onClose} severity={props.severity}>{props.children}</Alert>
            </div>
        </>
    );
}

export default GlobalHint;