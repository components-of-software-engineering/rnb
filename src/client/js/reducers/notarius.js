import { 
    NOTARIUS_GET_ALL_FAILURE,
    NOTARIUS_GET_ALL_REQUEST,
    NOTARIUS_GET_ALL_SUCCESS,
    NOTARIUS_GET_ONE_FAILURE,
    NOTARIUS_GET_ONE_REQUEST,
    NOTARIUS_GET_ONE_SUCCESS,
    defaultPayload
} from './../actions/notarius';

const initialState = {
    ...defaultPayload
};
  
function notariusReducer(state = initialState, action) {
    const data = action.payload;
    switch (action.type) {
        case NOTARIUS_GET_ONE_FAILURE:
        case NOTARIUS_GET_ONE_SUCCESS: 
        case NOTARIUS_GET_ONE_REQUEST: {
            return {
                ...state, 
                isFetching: data.isFetching,
                notariusObject: data.notariusObject,
            };
        }
        case NOTARIUS_GET_ALL_FAILURE:
        case NOTARIUS_GET_ALL_SUCCESS:
        case NOTARIUS_GET_ALL_REQUEST:  {
            return {
                ...state, 
                isFetchingAll: data.isFetchingAll,
                notariusObjectAll: data.notariusObjectAll
            };
        }
        default: {
            return state;
        } 
    }
}

export default notariusReducer;