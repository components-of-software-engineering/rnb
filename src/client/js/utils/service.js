export function isAdministrator(role) {
    return role === 1;
}

export function isRegister(role) {
    return role === 0;
}

export function authorizationHeaders(jwt) {
    return {
        headers: { Authorization: `Bearer ${jwt}` }
    }; 
}

export function formDataToJson(formData) {
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    return JSON.stringify(object);
}
