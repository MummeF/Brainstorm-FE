export const BACKEND_LOCAL = false
export const BACKEND_URL = BACKEND_LOCAL ? "http://localhost:8080" : "https://brainstorm-dhbw-backend.herokuapp.com"
export const CORS_ANYWHERE = "https://fierce-beach-68272.herokuapp.com/"

//Endpoints
export const RND_ROOM_ID = "/rndRoomId" //returns long
export const IS_ALIVE = "/isAlive" //returns string => res.ok ? online : offline
export const VAL_ROOM_ID = "/validateRoomId" //? roomId : long --- returns boolean
export const GET_ROOM = "/getRoom" //? roomId : long --- returns RoomModel
export const UPDT_ROOM = "/updateRoom" // body: Room --- returns string => res.ok ? success : denied
export const ADD_CTRBT = "/addContribution" // body: Contribution --- returns string => res.ok ? success : denied