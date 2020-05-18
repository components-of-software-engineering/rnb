import {
    SPECIAL_FORM_GET_FAILURE,
    SPECIAL_FORM_GET_REQUEST,
    SPECIAL_FORM_GET_SUCCESS,
    SPECIAL_FORM_CREATE_FAILURE,
    SPECIAL_FORM_CREATE_REQUEST,
    SPECIAL_FORM_CREATE_SUCCESS,
    SPECIAL_FORM_UPDATE_FAILURE,
    SPECIAL_FORM_UPDATE_REQUEST,
    SPECIAL_FORM_UPDATE_SUCCESS,
    SPECIAL_FORM_DELETE_FAILURE,
    SPECIAL_FORM_DELETE_REQUEST,
    SPECIAL_FORM_DELETE_SUCCESS,
    SPECIAL_FORM_GET_MIN_FAILURE,
    SPECIAL_FORM_GET_MIN_REQUEST,
    SPECIAL_FORM_GET_MIN_SUCCESS,
    defaultPayload    
} from '../actions/specialForm';

import {
    USER_LOGOUT,
} from '../actions/user';

const initialState = {
    ...defaultPayload,
    isFound: true
};
  
function specialFormReducer(state = initialState, action) {
    const data = action.payload;
    switch (action.type) {
        case SPECIAL_FORM_GET_MIN_FAILURE:
        case SPECIAL_FORM_GET_MIN_REQUEST:
        case SPECIAL_FORM_GET_MIN_SUCCESS:
        case SPECIAL_FORM_UPDATE_FAILURE:
        case SPECIAL_FORM_UPDATE_FAILURE:
        case SPECIAL_FORM_UPDATE_SUCCESS:
        case SPECIAL_FORM_CREATE_FAILURE:
        case SPECIAL_FORM_CREATE_REQUEST:
        case SPECIAL_FORM_CREATE_SUCCESS: {
            return {
                ...state, 
                specialFormObject: data.specialFormObject,
                isFetching: data.isFetching,
                isFound: data.isFound,
                error: data.error
            };
        }
        case SPECIAL_FORM_GET_FAILURE:
        case SPECIAL_FORM_GET_SUCCESS: {
            return {
                ...state, 
                specialFormObject: data.specialFormObject,
                isFetching: data.isFetching,
                error: data.error
            };
        }
        case SPECIAL_FORM_UPDATE_REQUEST:
        case SPECIAL_FORM_GET_REQUEST: {
            return {
                ...state, 
                specialFormObject: state.specialFormObject,
                isFetching: data.isFetching
            };
        }
        case SPECIAL_FORM_DELETE_REQUEST:
        case SPECIAL_FORM_DELETE_FAILURE:
        case SPECIAL_FORM_DELETE_SUCCESS: {
            return {
                ...state, 
                isFetching: data.isFetching,
                error: data.error
            };
        }
        case USER_LOGOUT: {
            return {
                ...defaultPayload
            };
        }
        default: {
            return state;
        }
    }
}

export default specialFormReducer;