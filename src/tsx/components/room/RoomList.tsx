import { Grid, setRef } from '@material-ui/core';
import * as React from 'react';
import { Dispatch, useState } from 'react';
import MRoom from '../../model/roomModel';
import { GET_ROOM_LST } from '../../tools/connections';
import { getJsonFromBackend } from '../../tools/fetching';
import CustomLoader from '../common/customLoader';
import RoomElement from './RoomElement';
import StyledMessage from '../common/styledMessage';


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



    const publicRoomExisting: boolean = roomList?.find((value) => value.public && value.state !== 'DONE') ? true : false;

    let roomElements: (JSX.Element | null)[] | undefined;
    roomElements = roomList?.map((room) => {
        if (!room.public || room.state === 'DONE') {
            return null;
        } else {
            return <Grid item xs={isMobile.current ? 12 : 6}>
                <RoomElement room={room} />
            </Grid>
        }
    });

    const List = () => {
        if (roomElements) {
            if (publicRoomExisting) {
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