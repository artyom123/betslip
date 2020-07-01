import { Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

import reducer from './reducer';

import { INIT } from '../constants/ActionTypesConstants';

const createStore = (rootReducer) => {
    const subject$ = new Subject();
    const store$ = subject$.pipe(
        startWith({ type: INIT }),
        scan(rootReducer, undefined),
    );

    store$.dispatch = (action) => subject$.next(action);

    return store$;
};

const store$ = createStore(reducer);

export default store$;
