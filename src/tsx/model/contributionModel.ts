export default interface MContribution{
    id: number;
    content: string;
    subject: string;
    reputation: number;
    comments: MComment[];
}

export interface MComment {
    id: number;
    content: string;
    reputation: number;
}