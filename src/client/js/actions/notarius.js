// @ts-check
export const NOTARIUS_GET_ALL_REQUEST = 'NOTARIUS_GET_ALL_REQUEST';
export const NOTARIUS_GET_ALL_SUCCESS = 'NOTARIUS_GET_ALL_SUCCESS';
export const NOTARIUS_GET_ALL_FAILURE = 'NOTARIUS_GET_ALL_FAILURE';
export const NOTARIUS_GET_ONE_REQUEST = 'NOTARIUS_GET_ONE_REQUEST';
export const NOTARIUS_GET_ONE_SUCCESS = 'NOTARIUS_GET_ONE_SUCCESS';
export const NOTARIUS_GET_ONE_FAILURE = 'NOTARIUS_GET_ONE_FAILURE';

import Notarius from '../model/notarius';
import { CURRENT_PATH_REDIRECT } from './redirect';
import { showMessage, typesMessages } from './showMessage';

export const defaultPayload = {
    isFetching: false,
    notariusObject: null,
    isFetchingAll: false,
    notariusObjectAll: false
};

export function getInfoAboutNotarius(id) {
    const jwt = localStorage.getItem('jwt');
    if (jwt === null) {
        return {
            type: 'JWT_NOT_FOUND',
            payload: {}
        };
    }
    return async function(dispatch) { 
        dispatch({ 
            type: NOTARIUS_GET_ONE_REQUEST,
            payload: { ...defaultPayload, isFetching: true }
        });
        const response = await Notarius.getById(jwt, id);
        if (response.statusCode === 404) {
            return dispatch({
                type: CURRENT_PATH_REDIRECT,
                payload: {
                    method: 'replace', 
                    path: '/notFound'
                }
            }); 
        }
        if (response.error !== null) {
            showMessage("Невдалося отримати інформацію", typesMessages.error)(dispatch);
            return dispatch({
                type: NOTARIUS_GET_ONE_FAILURE,
                payload: { ...defaultPayload, isFetching: false }
            });
        }
        const not = response.respBody.notarius;
        dispatch({
            type: NOTARIUS_GET_ONE_SUCCESS,
            payload: { ...defaultPayload, notariusObject: not },
        });  
    };
}

export function getAllNotarius() {
    const jwt = localStorage.getItem('jwt');
    return async function(dispatch) { 
        dispatch({ 
            type: NOTARIUS_GET_ALL_REQUEST,
            payload: { ...defaultPayload, isFetchingAll: true }
        });
        const response = await Notarius.getAll(jwt);
        if (response.error !== null) {
            showMessage(`Трапилась поимлка ${response.error.message}`, typesMessages.error)(dispatch);
            return dispatch({
                type: NOTARIUS_GET_ALL_FAILURE,
                payload: { ...defaultPayload, isFetchingAll: false } }
            );
        }
        const not = response.respBody.notaries;
        dispatch({
            type: NOTARIUS_GET_ALL_SUCCESS,
            payload: { ...defaultPayload, notariusObjectAll: not },
        });
    };
}
