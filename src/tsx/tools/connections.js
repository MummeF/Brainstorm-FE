export const BACKEND_LOCAL = false

export const BACKEND_DOMAIN = BACKEND_LOCAL ? "localhost:8080" : "brainstorm-dhbw-backend.herokuapp.com"
export const BACKEND_URL = (BACKEND_LOCAL ? "http://" : "https://") + BACKEND_DOMAIN
export const CORS_ANYWHERE = "https://fierce-beach-68272.herokuapp.com/"

//Endpoints
export const RND_ROOM_ID = "/rndRoomId" //returns long
export const IS_ALIVE = "/isAlive" //returns string => res.ok ? online : offline
export const VAL_ROOM_ID = "/validateRoomId" //? roomId : long --- returns boolean
export const GET_ROOM = "/getRoom" //? roomId : long --- returns RoomModel
export const UPDT_ROOM = "/updateRoom" // body: Room --- returns string => res.ok ? success : denied
export const ADD_CTRBT = "/addContribution" // body: Contribution --- returns string => res.ok ? success : denied
export const REM_CTRBT = "/deleteContribution" // ?roomId: long & contributionId: long --- returns string => res.ok ? success : denied
export const REM_ROOM = "/deleteRoom" // ?roomId: long --- returns string => res.ok ? success : denied
export const UPDT_CTRBT = "/updateContribution" // ?roomId: long & contributionId: long & content: string --- returns string => res.ok ? success : denied
export const GET_CTRBT = "/getContribution" // ?roomId: long & contributionId: long  --- returns Contribution


//Websocket
export const WEBSOCKET_URL = "ws://" + BACKEND_DOMAIN + "/ws"
export const WS_SUB = "/user/topic/room"
export const WS_SEND = "/app/subscribeForRoom" 