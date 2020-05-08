import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, Typography, createStyles } from '@material-ui/core';

export interface IRoomCloseProps {

}

const styles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            marginBottom: theme.spacing(1),
        }
    })
);

const RoomClose: React.FunctionComponent<IRoomCloseProps> = (props: IRoomCloseProps) => {
    const classes = styles();

    return (
        <>
            <Typography variant="h3" className={classes.title}>Der Raum wurde geschlossen.</Typography>
        </>
    );
}

export default RoomClose;