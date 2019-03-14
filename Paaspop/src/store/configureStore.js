import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import usersReducer from './reducers/users';
import performancesReducer from './reducers/performances';
import placesReducer from './reducers/places';

const rootReducer = combineReducers({
  usersStore: usersReducer,
  performancesStore: performancesReducer,
  placesStore: placesReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
