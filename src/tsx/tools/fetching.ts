import { BACKEND_URL, CORS_ANYWHERE, BACKEND_LOCAL } from "./connections"

const user = 'fe-tech-user'
const pass = '+vq#3RL!ygE%f&HLM?t_'

let headers = new Headers();
headers.set('Authorization', 'Basic ' + new Buffer(user + ':' + pass).toString('base64'));

export default function getFromBackend(path: string) {
    const domain = (BACKEND_LOCAL ? '' : CORS_ANYWHERE) + BACKEND_URL;
    return fetch(domain + path, {
        method: 'GET',
        headers: headers,
    })

}

export function getJsonFromBackend(path: string) {
    return getFromBackend(path)
        .then(res => res.json());
}



