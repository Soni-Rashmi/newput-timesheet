import combineReducers from 'redux/lib/combineReducers';
import { reducers } from './form-reducer';
import UserReducer from './user-reducer';

const rootReducer = combineReducers({
    form: reducers,
    employee: UserReducer
});

export default rootReducer;
