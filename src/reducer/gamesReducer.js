import { GAMES_ACTION_TYPES } from '../constants/ActionTypesConstants';

const initialState = {
    coefficients: [],
};

const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
    case GAMES_ACTION_TYPES.SET_GAMES:
        return {
            ...state,
            games: action.payload.games,
        };
    default:
        return state;
    }
};

export default gamesReducer;
