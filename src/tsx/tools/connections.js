export const BACKEND_LOCAL = true
export const BACKEND_URL = BACKEND_LOCAL ? "http://localhost:8080" : "https://brainstorm-dhbw-backend.herokuapp.com"
export const CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com/"

//Endpoints
export const RND_ROOM_ID = "/rndRoomId"
export const VAL_ROOM_ID = "/validateRoomId" //? roomId : long