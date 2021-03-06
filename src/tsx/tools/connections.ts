export const BACKEND_LOCAL = false


export const BACKEND_DOMAIN = BACKEND_LOCAL ? "localhost:8080" : "brainstorm-dhbw-backend.herokuapp.com"
export const isHttps: boolean = window.location.protocol === 'https'

export const BACKEND_URL = (BACKEND_LOCAL ? "http" : "https") + "://" + BACKEND_DOMAIN
export const CORS_ANYWHERE = "https://fierce-beach-68272.herokuapp.com/"

export const API_PREFIX = "/api"



//Endpoints

//Room
export const CRT_ROOM = API_PREFIX + "/createRoom" //? topic?: string & isPublic?: boolean & password?: string & moderatorId: string --- returns long
export const VAL_ROOM_ID = API_PREFIX + "/validateRoomId" //? roomId : long --- returns boolean
export const GET_ROOM = API_PREFIX + "/getRoom" //? roomId : long --- returns RoomModel
export const UPDT_ROOM = API_PREFIX + "/updateRoom" // body: Room --- returns string => res.ok ? success : denied
export const REM_ROOM = API_PREFIX + "/deleteRoom" // ?roomId: long --- returns string => res.ok ? success : denied
export const INC_STT = API_PREFIX + "/increaseRoomState" // ?roomId: long  ---  returns boolean  
export const VAL_MOD_ID = API_PREFIX + "/validateModeratorId" // ?roomId: long & moderatorId: string ---  returns boolean  
export const SET_MOD_ID = API_PREFIX + "/setModeratorId" // ?roomId: long & moderatorId: string ---  returns boolean  
//History
export const HIST_GET_ROOM = API_PREFIX + "/getHistoryRoom" // ?roomId: long  ---  returns RoomModel
//PW
export const SET_PWD = API_PREFIX + "/setPassword" //? roomId?: long & body: password: string --- returns long
export const SET_MOD_PWD = API_PREFIX + "/setModeratorPassword" //? roomId?: long & body: password: string --- returns long
export const VLD_MOD_PWD = API_PREFIX + "/validateModeratorPassword" // ?roomId: long & body: password: string ---  returns boolean
export const VLD_PWD = API_PREFIX + "/validatePassword" // ?roomId: long & body: password: string ---  returns boolean
export const HAS_PWD = API_PREFIX + "/hasPassword" // ?roomId: long  ---  returns boolean
//Lists
export const GET_ROOM_LST = API_PREFIX + "/getRoomList" //  returns Room[]

//Contribution
export const ADD_CTRBT = API_PREFIX + "/addContribution" // body: Contribution --- returns string => res.ok ? success : denied
export const REM_CTRBT = API_PREFIX + "/deleteContribution" // ?roomId: long & contributionId: long --- returns string => res.ok ? success : denied
export const UPDT_CTRBT = API_PREFIX + "/updateContribution" // ?roomId: long & contributionId: long & content: string & subject: string --- returns string => res.ok ? success : denied
export const GET_CTRBT = API_PREFIX + "/getContribution" // ?roomId: long & contributionId: long  --- returns Contribution
export const VT_CTRBT_UP = API_PREFIX + "/voteContributionUp" //?roomId: number & contributionId: number --- returns boolean => res.ok ? success : denied
export const VT_CTRBT_DN = API_PREFIX + "/voteContributionDown" //?roomId: number & contributionId: number --- returns boolean => res.ok ? success : denied

//Comment

export const ADD_CMT = API_PREFIX + "/addComment" //?roomId: number & contributionId: number & body: content: string --- returns boolean => res.ok ? success : denied
export const VT_CMT_UP = API_PREFIX + "/voteCommentUp" //?roomId: number & contributionId: number & commentId: number --- returns boolean => res.ok ? success : denied
export const VT_CMT_DN = API_PREFIX + "/voteCommentDown" //?roomId: number & contributionId: number & commentId: number --- returns boolean => res.ok ? success : denied

//Common
export const IS_ALIVE = API_PREFIX + "/isAlive" //returns string => res.ok ? online : offline


//Websocket
export const WEBSOCKET_URL = (BACKEND_LOCAL ? "ws" : "wss") + "://" + BACKEND_DOMAIN + "/websocket"
export const WS_TPC = "/user/topic/room"
export const WS_SUB = "/app/subscribe"
export const WS_UNSUB = "/app/unsubscribe" 