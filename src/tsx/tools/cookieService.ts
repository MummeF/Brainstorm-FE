import Cookies from "universal-cookie";
import { isHttps } from "./connections";
import { v4 as generateRndModId } from 'uuid';


const cookies = new Cookies();

const cookiesAccepted = 'cookiesAccepted';
const modId = 'modId';

export function setCookie(cookie: string, value: string) {
    cookies.set(cookie, value, { sameSite: 'lax', path: '/', secure: isHttps })
}

export function getCookiesAccepted() {
    return cookies.get(cookiesAccepted);
}

export function setCookiesAccepted(value: string) {
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