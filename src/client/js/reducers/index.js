import { combineReducers } from 'redux';
import userReducer from './user';
import invoicesReducer from './invoices';
import specialFormReducer from './specialForm';
import messageReducer from './showMessages';
import registersReducer from './registers';
import registriesReducer from './registries'; 
import registryReducer from './registry';
import notifyReducer from './noyify';

const rootReducer = combineReducers({
    user: userReducer,
    registers: registersReducer,
    registries: registriesReducer,
    registry: registryReducer,
    invoices: invoicesReducer,
    specialForm: specialFormReducer,
    systemMessages: messageReducer,
    notify: notifyReducer
});

export default rootReducer;