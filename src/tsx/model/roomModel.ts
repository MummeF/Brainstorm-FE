import MContribution from "./contributionModel";

export default interface MRoom{
    id: number;
    topic: string;
    contributions: MContribution[];
}