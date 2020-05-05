import Contribution from "./contribution";

export default interface RoomModel{
    id: number;
    topic: string;
    contributions: Contribution[];
}