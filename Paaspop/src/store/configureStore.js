import { createStore, combineReducers } from 'redux';

import paaspopReducer from './reducers/paaspop';

const rootReducer = combineReducers({
    paaspop: paaspopReducer
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;