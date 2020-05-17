import {
    REGISTERS_GET_ALL_FAILURE,
    REGISTERS_GET_ALL_SUCCESS,
    REGISTERS_GET_ALL_REQUEST,
    defaultPayload    
} from '../actions/registers';

import {
    USER_LOGOUT,
} from '../actions/user';

const initialState = {
    ...defaultPayload
};
  
function registersReducer(state = initialState, action) {
    const data = action.payload;
    switch (action.type) {
        case REGISTERS_GET_ALL_FAILURE:
        case REGISTERS_GET_ALL_SUCCESS: {
            return {
                ...state, 
                registersObject: data.registersObject,
                isFetching: data.isFetching,
                error: data.error
            };
        }
        case REGISTERS_GET_ALL_REQUEST: {
            return {
                ...state, 
                registersObject: state.registersObject,
                isFetching: data.isFetching
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

export default registersReducer;