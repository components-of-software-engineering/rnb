// @ts-check
import Response from './response';
import { authorizationHeaders, formDataToJson } from '../utils/service';

class Notarius {
    static async getById(jwt, id) {
        const reqOptions = authorizationHeaders(jwt);
        reqOptions.method = 'POST';
        reqOptions.headers['Content-Type'] = 'application/json';
        reqOptions.body = JSON.stringify({
            "id": id
        });
        let response, respBody, statusCode;
        let error = null;
        try {
            response = await fetch(`/notarius/get`, reqOptions);
            statusCode = response.status;
            if (!response.ok) throw new Error(`Сталася помилка`);
            respBody = await response.json();
        } catch (e) {
            error = e;
        }
        return new Response(statusCode, respBody, error);
    }

    static async getAll(jwt) {
        const reqOptions = authorizationHeaders(jwt);
        reqOptions.method = 'POST';
        reqOptions.headers['Content-Type'] = 'application/json';
        reqOptions.body = JSON.stringify({ });
        let response, respBody, statusCode;
        let error = null;
        try {
            response = await fetch(`/notarius/get_all`, reqOptions);
            statusCode = response.status;
            if (!response.ok) throw new Error(response.statusText);
            respBody = await response.json();
        } catch (e) {
            error = e;
        }
        return new Response(statusCode, respBody, error);
    }
}

export default Notarius;
