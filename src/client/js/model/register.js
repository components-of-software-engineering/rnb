// @ts-check
import url from 'url';
import Response from './response';
import { authorizationHeaders, formDataToJson } from '../utils/service';

class Register {
    static async authenticate(username, password) {
        const credentials = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
        const bodyData = new URLSearchParams(credentials);
        const bodyDataJson = formDataToJson(bodyData);
        let response, respBody, statusCode;
        let error = null;
        try {
            response = await fetch("/auth/login", { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: bodyDataJson
            });
            statusCode = response.status;
            if (!response.ok) throw new Error(`Неправильний логін або пароль`);
            respBody = await response.json();
        } catch (e) {
            error = e;
        }
        return new Response(statusCode, respBody, error);
    }

    static async me(jwt) {
        const reqOptions = authorizationHeaders(jwt);
        reqOptions.method = 'GET';
        let response, respBody, statusCode;
        let error = null;
        try {
            response = await fetch("/auth/me", reqOptions);
            statusCode = response.status;
            if (!response.ok) throw new Error(`Сталася помилка під час авторизації`);
            respBody = await response.json();
        } catch (e) {
            error = e;
        }
        return new Response(statusCode, respBody, error);
    }

    static async create(formData) {
        let response, respBody, statusCode;
        let error = null;
        try {
            response = await fetch("/auth/register", { 
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: formDataToJson(formData)
            });
            statusCode = response.status;
            if (!response.ok || response.status !== 201) throw new Error(`Сталася помилка під час реєстрації`);
        } catch (e) {
            error = e;
        }
        return new Response(statusCode, respBody, error);
    }

    static async isFreeLogin(login) {
        let response, respBody, statusCode;
        let error = null;
        try {
            response = await fetch(`/api/v1/users/${encodeURIComponent(login)}`, { method: "HEAD" });
            statusCode = response.status;
            if (!response.ok || response.status !== 200) throw new Error(`Логін вже існує`);
        } catch (e) {
            error = e;
        }
        return new Response(statusCode, respBody, error);
    }

    static async getByLogin(jwt, username) {
        const reqOptions = authorizationHeaders(jwt);
        reqOptions.method = 'POST';
        reqOptions.headers['Content-Type'] = 'application/json';
        reqOptions.body = JSON.stringify({
            "username": username
        });
        let response, respBody, statusCode;
        let error = null;
        try {
            response = await fetch(`/users/get`, reqOptions);
            statusCode = response.status;
            if (!response.ok) throw new Error(`Сталася помилка`);
            respBody = await response.json();
        } catch (e) {
            error = e;
        }
        return new Response(statusCode, respBody, error);
    }

    static async updateByLogin(jwt, login, data, onlyRole = false) {
        const reqOptions = authorizationHeaders(jwt);
        reqOptions.method = 'POST';
        reqOptions.headers['Content-Type'] = 'application/json';
        const object = {};
        data.forEach((value, key) => {
            object[key] = value;
        });
        reqOptions.body = JSON.stringify({
            "arguments_to_update": {
                ...object
            },
            "primary_keys": {
                username: login
            }
        });
        let response, respBody, statusCode;
        let error = null;
        try {
            response = await fetch(`/users/update`, reqOptions);
            statusCode = response.status;
            if (!response.ok) throw new Error(response.statusText);
            respBody = await response.json();
        } catch (e) {
            error = e;
        }
        console.log(respBody);
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
            response = await fetch(`/users/get_all`, reqOptions);
            statusCode = response.status;
            if (!response.ok) throw new Error(response.statusText);
            respBody = await response.json();
        } catch (e) {
            error = e;
        }
        console.log(respBody);
        return new Response(statusCode, respBody, error);
    }

    static async disactivate(jwt, username, status = false) {
        const reqOptions = authorizationHeaders(jwt);
        reqOptions.method = 'POST';
        reqOptions.headers['Content-Type'] = 'application/json';
        reqOptions.body = JSON.stringify({
            "arguments_to_update": {
                "status": status
            },
            "primary_keys": {
                username
            }
        });
        let response, respBody, statusCode;
        let error = null;
        try {
            response = await fetch(`/users/update`, reqOptions);
            statusCode = response.status;
            if (!response.ok) throw new Error(response.statusText);
            respBody = await response.json();
        } catch (e) {
            error = e;
        }
        console.log(respBody);
        return new Response(statusCode, respBody, error);
    }
}

export default Register;