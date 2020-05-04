import React, { useState, Dispatch, SetStateAction } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import Room from "./room";
import { getJsonFromBackend } from "../tools/fetching";
import { VAL_ROOM_ID } from "../tools/connections";

type TParams = { id: string }


export default function RoomWrapper({ match }: RouteComponentProps<TParams>) {
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
                return <Room id={+id}></Room>
            } else {
                return <Redirect to={{ pathname: '/login' }}></Redirect>
            }
        } else {
            return null; //insert loader
        }
    } else {
        return <Redirect to={{ pathname: '/login' }}></Redirect>
    }

}