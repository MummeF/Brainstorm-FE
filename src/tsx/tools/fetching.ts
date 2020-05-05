import { BACKEND_URL, CORS_ANYWHERE, BACKEND_LOCAL, IS_ALIVE, UPDT_ROOM } from "./connections"
import RoomModel from "../model/roomModel";

const user = 'fe-tech-user'
const pass = '+vq#3RL!ygE%f&HLM?t_'

let headers = new Headers();
headers.set('Authorization', 'Basic ' + new Buffer(user + ':' + pass).toString('base64'));

let postHeaders = new Headers();
postHeaders.set('Authorization', 'Basic ' + new Buffer(user + ':' + pass).toString('base64'));
postHeaders.set('Content-Type', 'application/json');

const domain = (BACKEND_LOCAL ? '' : CORS_ANYWHERE) + BACKEND_URL;

export default async function getFromBackend(path: string): Promise<any> {
    return fetch(domain + path, {
        method: 'GET',
        headers: headers,
    });
}

export function getJsonFromBackend(path: string): Promise<any> {
    return getFromBackend(path)
        .then(res => res.json());
}

export function postDataToBackend(path: string, data: any): Promise<any> {
    return fetch(domain + path, {
        method: 'POST',
        headers: postHeaders,
        body: JSON.stringify(data)
    });
}

export async function updateRoom(room: RoomModel): Promise<boolean> {
    let updated: boolean = false;
    await postDataToBackend(UPDT_ROOM, room)
        .then(res => {
            if (res.ok) {
                updated = true
            } else {
                updated = false
            }
        })
        .catch(res => updated = false)
    return updated;
}

export async function backendOnline(): Promise<boolean> {
    let online: boolean = false;
    // await timeoutPromise(2000, getFromBackend(IS_ALIVE))
    //     .then(res => online = true)
    //     .catch(res => online = false)
    await getFromBackend(IS_ALIVE)
        .then(res => {
            if (res.ok) {
                online = true;
            } else {
                online = false;
            }
        })
        .catch(res => online = false);
    return online;
}


// function timeoutPromise(ms: number, promise: Promise<any>) {
//     return new Promise((resolve, reject) => {
//         const timeoutId = setTimeout(() => {
//             reject(new Error("promise timeout"))
//         }, ms);
//         promise.then(
//             (res) => {
//                 clearTimeout(timeoutId);
//                 resolve(res);
//             },
//             (err) => {
//                 clearTimeout(timeoutId);
//                 reject(err);
//             }
//         );
//     })
// }
