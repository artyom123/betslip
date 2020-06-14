import { combineReducers } from 'redux';

import gamesReducer from './gamesReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
    gamesReducer,
    userReducer,
});

export default reducer;
