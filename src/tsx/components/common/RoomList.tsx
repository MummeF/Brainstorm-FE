import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, createStyles, Grid, setRef } from '@material-ui/core';
import { useState, Dispatch } from 'react';
import MRoom from '../../model/roomModel';
import StyledMessage from './styledMessage';
import CustomLoader from './customLoader';
import RoomElement from './RoomElement';
import { getJsonFromBackend } from '../../tools/fetching';
import { GET_ROOM_LST } from '../../tools/connections';


export interface IRoomListProps {

}

// const styles = makeStyles((theme: Theme) =>
//     createStyles({
//     })
// );

const RoomList: React.FunctionComponent<IRoomListProps> = (props: IRoomListProps) => {
    // const classes = styles();

    const [roomList, setRoomList]: [MRoom[] | undefined, Dispatch<MRoom[]>] = useState();
    const isMobile = React.useRef(window.innerWidth < 480);
    React.useEffect(() => {
        setRef(isMobile, window.innerWidth < 480)
        if (!roomList) {
            getJsonFromBackend(GET_ROOM_LST)
                .then(res => setRoomList(res));
        }
    });




    let roomElements: JSX.Element[] | undefined;

    roomElements = roomList?.map((room) => {
        return <Grid item xs={isMobile.current ? 12 : 6}>
            <RoomElement room={room} />
        </Grid>
    });

    const List = () => {
        if (roomElements) {
            if (roomElements.length > 0) {
                return <> {roomElements}</>;
            } else {
                return <StyledMessage message="Keine öffentlichen Räume registriert" />;
            }
        } else {
            return <CustomLoader inline></CustomLoader>;
        }
    }

    return (
        <>
            <Grid container direction="row" spacing={2}>
                <List />
            </Grid>
        </>
    );
}

export default RoomList;