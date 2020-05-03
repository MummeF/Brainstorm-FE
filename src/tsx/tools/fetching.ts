import { BACKEND_URL, CORS_ANYWHERE } from "./connections";

export default function getFromBackend(path: string) {
    return fetch(CORS_ANYWHERE + BACKEND_URL + path, {
        method: 'GET'
    })

}

export function getJsonFromBackend(path: string) {
    return getFromBackend(path)
        .then(res => res.json());
}