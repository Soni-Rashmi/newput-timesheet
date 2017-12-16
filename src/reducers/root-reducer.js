import { combineReducers } from 'redux';
import { reducers } from './form-reducer';
import UserReducer from './user-reducer';

const rootReducer = combineReducers({
    form: reducers,
    employee: UserReducer
});

export default rootReducer;
