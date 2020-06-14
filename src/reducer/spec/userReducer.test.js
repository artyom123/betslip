import userReducer from '../userReducer';
import { USER_ACTION_TYPES } from '../../constants/ActionTypesConstants';

const initialState = {
    coefficients: {
        1: 3.2,
    },
};

describe('userReducer reducer', () => {
    it('set coefficients', () => {
        const newCoefficients = {
            1: 3.2,
        };

        const action = {
            type: USER_ACTION_TYPES.SET_COEFFICIENTS,
            payload: { coefficients: newCoefficients },
        };

        const result = userReducer(initialState, action);

        expect(result).toMatchObject({
            ...initialState,
        });
    });
});
