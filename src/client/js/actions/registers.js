// @ts-check
export const REGISTERS_GET_ALL_REQUEST = 'REGISTERS_GET_ALL_REQUEST';
export const REGISTERS_GET_ALL_FAILURE = 'REGISTERS_GET_ALL_FAILURE';
export const REGISTERS_GET_ALL_SUCCESS = 'REGISTERS_GET_ALL_SUCCESS';
import { showMessage, typesMessages } from './showMessage';
import Register from '../model/register';

export const defaultPayload = {
    registersObject: null,
    isFetching: false,
    error: '',
};

export function getAllRegisters() {
    const jwt = localStorage.getItem('jwt');
    return async function(dispatch) { 
        dispatch({ 
            type: REGISTERS_GET_ALL_REQUEST,
            payload: { ...defaultPayload, isFetching: true }
        });
        const response = await Register.getAll(jwt);
        if (response.error !== null) {
            showMessage(`Трапилась поимлка ${response.error.message}`, typesMessages.error)(dispatch);
            return dispatch({
                type: REGISTERS_GET_ALL_FAILURE,
                payload: { ...defaultPayload, error: response.error.message } }
            );
        }
        const registers = response.respBody.usages_registers.filter(x => x.role === 0);
        dispatch({
            type: REGISTERS_GET_ALL_SUCCESS,
            payload: { ...defaultPayload, registersObject: registers },
        });
    };
}