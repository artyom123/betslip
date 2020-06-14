import { USER_ACTION_TYPES } from '../constants/ActionTypesConstants';

const initialState = {
    coefficients: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
    case USER_ACTION_TYPES.SET_COEFFICIENTS:
        return {
            ...state,
            coefficients: action.payload.coefficients,
        };
    default:
        return state;
    }
};

export default userReducer;
