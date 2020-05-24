export default interface MContribution{
    id: number;
    content: string;
    subject: string;
    reputation: number;
    comments: Comment[];
}

export default interface Comment {
    content: string;
    reputation: number;
}