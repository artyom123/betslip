import { Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

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

const createStore = (rootReducer) => {
    const subject$ = new Subject();
    const store$ = subject$.pipe(
        startWith({ type: '__INIT__' }),
        scan(rootReducer, undefined),
    );

    store$.dispatch = (action) => subject$.next(action);

    return store$;
};

const store$ = createStore(reducer);

export default store$;

// store$.subscribe((state) => state);
