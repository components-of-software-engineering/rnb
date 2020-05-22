// @ts-check
export const SPECIAL_FORM_GET_REQUEST      = 'SPECIAL_FORM_GET_REQUEST';
export const SPECIAL_FORM_GET_FAILURE      = 'SPECIAL_FORM_GET_FAILURE';
export const SPECIAL_FORM_GET_SUCCESS      = 'SPECIAL_FORM_GET_SUCCESS';
export const SPECIAL_FORM_GET_MIN_REQUEST  = 'SPECIAL_FORM_GET_MIN_REQUEST';
export const SPECIAL_FORM_GET_MIN_FAILURE  = 'SPECIAL_FORM_GET_MIN_FAILURE';
export const SPECIAL_FORM_GET_MIN_SUCCESS  = 'SPECIAL_FORM_GET_MIN_SUCCESS';
export const SPECIAL_FORM_CREATE_REQUEST   = 'SPECIAL_FORM_CREATE_REQUEST';
export const SPECIAL_FORM_CREATE_FAILURE   = 'SPECIAL_FORM_CREATE_FAILURE';
export const SPECIAL_FORM_CREATE_SUCCESS   = 'SPECIAL_FORM_CREATE_SUCCESS';
export const SPECIAL_FORM_UPDATE_REQUEST   = 'SPECIAL_FORM_UPDATE_REQUEST';
export const SPECIAL_FORM_UPDATE_FAILURE   = 'SPECIAL_FORM_UPDATE_FAILURE';
export const SPECIAL_FORM_UPDATE_SUCCESS   = 'SPECIAL_FORM_UPDATE_SUCCESS';
export const SPECIAL_FORM_DELETE_REQUEST   = 'SPECIAL_FORM_DELETE_REQUEST';
export const SPECIAL_FORM_DELETE_FAILURE   = 'SPECIAL_FORM_DELETE_FAILURE';
export const SPECIAL_FORM_DELETE_SUCCESS   = 'SPECIAL_FORM_DELETE_SUCCESS';
import { showMessage, typesMessages } from './showMessage';
import SpecialForm from '../model/specialForm';
import { CURRENT_PATH_REDIRECT } from './redirect';

export const defaultPayload = {
    invoiceObject: null,
    isFetching: false,
    error: ''
};

export function getMinimalInfoAboutSpecialForm(serial, number) {
    return async function(dispatch) { 
        dispatch({ 
            type: SPECIAL_FORM_GET_MIN_REQUEST,
            payload: { ...defaultPayload, isFetching: true }
        });
        const response = await SpecialForm.getMinimalInfo(serial, number);
        if (response.statusCode === 404) {
            return dispatch({
                type: SPECIAL_FORM_GET_MIN_FAILURE,
                payload: { ...defaultPayload, specialFormObject: {}, isFound: false } }
            );
        }
        if (response.error !== null) {
            showMessage(`Трапилась поимлка ${response.error.message}`, typesMessages.error)(dispatch);
            return dispatch({
                type: SPECIAL_FORM_GET_MIN_FAILURE,
                payload: { ...defaultPayload, error: response.error.message } }
            );
        }
        const specialForm = response.respBody;
        dispatch({
            type: SPECIAL_FORM_GET_MIN_SUCCESS,
            payload: { ...defaultPayload, isFound: true, specialFormObject: specialForm },
        });
    };
}

export function getInvoiceByNum(number) {
    const jwt = localStorage.getItem('jwt');
    return async function(dispatch) { 
        dispatch({ 
            type: SPECIAL_FORM_GET_REQUEST,
            payload: { ...defaultPayload, isFetching: true }
        });
        const response = await SpecialForm.getByNumber(jwt, number);
        if (response.statusCode === 404) {
            dispatch({
                type: CURRENT_PATH_REDIRECT,
                payload: {
                    method: 'replace', 
                    path: '/notFound'
                }
            });
            return dispatch({
                type: SPECIAL_FORM_GET_FAILURE,
                payload: { ...defaultPayload, error: response.error.message } }
            );
        }
        if (response.error !== null) {
            showMessage(`Трапилась поимлка ${response.error.message}`, typesMessages.error)(dispatch);
            return dispatch({
                type: SPECIAL_FORM_GET_FAILURE,
                payload: { ...defaultPayload, error: response.error.message } }
            );
        }
        const invoice = response.respBody;
        dispatch({
            type: SPECIAL_FORM_GET_SUCCESS,
            payload: { ...defaultPayload, invoiceObject: invoice },
        });
    };
}

export function createInvoice(formData) {
    const jwt = localStorage.getItem('jwt');
    return async function(dispatch) { 
        dispatch({ 
            type: SPECIAL_FORM_CREATE_REQUEST,
            payload: { ...defaultPayload, isFetching: true }
        });
        const response = await SpecialForm.create(jwt, formData);
        if (response.error !== null || response.statusCode !== 201) {
            showMessage("Не вдалося створити. Перевірте правильність даних", typesMessages.error)(dispatch);
            return dispatch({
                type: SPECIAL_FORM_CREATE_FAILURE,
                payload: { ...defaultPayload, error: response.error ? response.error.message: 'error ocurred' }
            });
        }
        dispatch({
            type: SPECIAL_FORM_CREATE_SUCCESS,
            payload: { ...defaultPayload, invoiceObject: response.respBody },
        }); 
        const num = response.respBody.data.number;
        dispatch({
            type: CURRENT_PATH_REDIRECT,
            payload: {
                method: 'push', 
                path: `/invoices/${num}`
            }
        });
        showMessage(`Успішно створено накладну #${num}`, typesMessages.success)(dispatch);
    }; 
}

export function updateInvoice(number, formData) {
    const jwt = localStorage.getItem('jwt');
    return async function(dispatch) { 
        dispatch({ 
            type: SPECIAL_FORM_UPDATE_REQUEST,
            payload: { ...defaultPayload, isFetching: true }
        });
        const response = await SpecialForm.update(jwt, number, formData);
        if (response.error !== null) {
            showMessage("Не вдалося оновити. Перевірте правильність даних", typesMessages.error)(dispatch);
            return dispatch({
                type: SPECIAL_FORM_UPDATE_FAILURE,
                payload: { ...defaultPayload, error: response.error ? response.error.message: 'error ocurred' }
            });
        }
        dispatch({
            type: SPECIAL_FORM_UPDATE_SUCCESS,
            payload: { ...defaultPayload, invoiceObject: response.respBody },
        }); 
        const num = response.respBody.data.number;
        dispatch({
            type: CURRENT_PATH_REDIRECT,
            payload: {
                method: 'push', 
                path: `/invoices/${num}`
            }
        });
        showMessage(`Успішно оновлено накладну #${num}`, typesMessages.success)(dispatch);
    }; 
}

export function deleteInvoiceByNum(number) {
    const jwt = localStorage.getItem('jwt');
    return async function(dispatch) { 
        dispatch({ 
            type: SPECIAL_FORM_DELETE_REQUEST,
            payload: { ...defaultPayload, isFetching: true }
        });
        const response = await SpecialForm.deleteByNumber(jwt, number);
        if (response.statusCode === 204) {
            dispatch({
                type: SPECIAL_FORM_DELETE_SUCCESS,
                payload: { ...defaultPayload, isFetching: false } }
            ); 
            showMessage(`Накладна #${number} була успішно видалена`, typesMessages.success)(dispatch);
            return dispatch({
                type: CURRENT_PATH_REDIRECT,
                payload: {
                    method: 'push', 
                    path: '/invoices'
                }
            });
        }
        showMessage(`Трапилась помилка ${response.error && response.error.message}`, typesMessages.error)(dispatch);
        return dispatch({
            type: SPECIAL_FORM_DELETE_FAILURE,
            payload: { ...defaultPayload, error: response.error ? response.error.message : 'error' } }
        );
    };
}