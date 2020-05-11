import { Card, CardContent, createStyles, Grid, IconButton, Theme, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import MRoom from '../../model/roomModel';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

export interface IRoomElementProps {
    room: MRoom;
}

const styles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            backgroundColor: theme.palette.grey[300],
        },
    })
);

const RoomElement: React.FunctionComponent<IRoomElementProps> = (props: IRoomElementProps) => {
    const classes = styles();
    const [redirect, setRedirect] = useState(false);

    if (redirect) {
        return <Redirect to={"/room/" + props.room.id}></Redirect>
    }

    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <Grid direction="row"
                        container
                        justify="space-between"
                        alignItems="center">
                        <Grid item xs={11}>
                            <Typography variant="h6">{props.room.topic ? props.room.topic : ("Raum " + props.room.id)}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton onClick={() => setRedirect(true)}>
                                <MeetingRoomIcon />
                            </IconButton>
                        </Grid>
                    </Grid>


                </CardContent>
            </Card>
        </>
    );
}

export default RoomElement;