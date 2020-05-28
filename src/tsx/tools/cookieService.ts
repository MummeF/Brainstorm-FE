import Cookies, { CookieChangeListener } from "universal-cookie";
import { isHttps } from "./connections";
import { v4 as generateRndModId } from 'uuid';


const cookies = new Cookies();

export const cookiesAccepted = 'cookiesAccepted';
export const modId = 'modId';
export const votedContributions = 'votedContributions';
export const votedComments = 'votedComments';

export interface VotedComment {
    roomId: number;
    contributionId: number;
    commentId: number;
    votedUp: boolean;
}
export interface VotedContribution {
    roomId: number;
    contributionId: number;
    votedUp: boolean;
}

export function setCookie(cookie: string, value: any, options?: any) {
    cookies.set(cookie, value, { sameSite: 'lax', path: '/', secure: isHttps, ...options })
}



export function getCookiesAccepted() {
    return cookies.get(cookiesAccepted);
}

export function setCookiesAccepted(value: any, callback: CookieChangeListener) {
    cookies.addChangeListener(callback);
    setCookie(cookiesAccepted, value);
}

export function setModId(value: string) {
    setCookie(modId, value);
}

export function getModId() {
    return cookies.get(modId);
}

export function setRandomModId(): Promise<string> {
    return new Promise((resolve, reject) => {
        if (!cookies.get('modId')) {
            const randomModId: string = generateRndModId();
            setModId(randomModId);
            if (!cookies.get(modId)) {
                return reject("");
            }
        }
        return resolve(getModId());
    })
}

export function getVotedComments(): VotedComment[] {
    const cookie = cookies.get(votedComments);
    if (cookie) {
        return cookie;
    } else {
        return [];
    }
}

export function addVotedComment(roomId: number, contributionId: number, commentId: number, votedUp: boolean) {
    const voted: VotedComment[] = getVotedComments();
    voted.push({ roomId, contributionId, commentId, votedUp });
    setCookie(votedComments, voted, { maxAge: 60 * 60 });
}

export function checkIfCommentIsVoted(roomId: number, contributionId: number, commentId: number): VotedComment | undefined {
    return getVotedComments().find((value) => value.commentId === commentId && value.contributionId === contributionId && value.roomId === roomId);
}
export function checkIfContributionIsVoted(roomId: number, contributionId: number): VotedContribution | undefined {
    return getVotedContributions().find((value) => value.contributionId === contributionId && value.roomId === roomId)
}

export function getVotedContributions(): VotedContribution[] {
    const cookie = cookies.get(votedContributions);
    if (cookie) {
        return cookie;
    } else {
        return [];
    }
}

export function addVotedContribution(roomId: number, contributionId: number, votedUp: boolean) {
    const voted: VotedContribution[] = getVotedContributions();
    voted.push({ roomId, contributionId, votedUp });
    setCookie(votedContributions, voted, { maxAge: 60 * 60 });
}