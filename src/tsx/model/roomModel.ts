import MContribution from "./contributionModel";

export default interface MRoom{
    id: number;
    topic: string;
    public: boolean;
    contributions: MContribution[];
}

export enum RoomState{
    "CREATE", "EDIT", "DONE"
}