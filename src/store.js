import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root-reducer';

const myLogger = (store) => (next) => (action) => {
  next(action);
};
export const store = createStore(rootReducer, applyMiddleware( myLogger));
