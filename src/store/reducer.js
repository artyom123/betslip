import { GAMES_ACTION_TYPES, USER_ACTION_TYPES } from '../constants/ActionTypesConstants';

const initialState = {
    games: [],
    coefficients: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case GAMES_ACTION_TYPES.SET_GAMES:
        return {
            ...state,
            games: action.payload.games,
        };
    case USER_ACTION_TYPES.SET_COEFFICIENTS:
        return {
            ...state,
            coefficients: action.payload.coefficients,
        };
    default:
        return state;
    }
};

export default reducer;
