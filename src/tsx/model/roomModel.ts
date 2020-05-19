import MContribution from "./contributionModel";

export default interface MRoom{
    id: number;
    topic: string;
    description: string;
    public: boolean;
    state: string;
    contributions: MContribution[];
}
