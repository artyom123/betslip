import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Label, Input } from 'reactstrap';

import store$ from '../../store';

import './Bid.css';

const propTypes = {
    action: PropTypes.func.isRequired,
    bids: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.number.isRequired,
};

const Bid = ({ action, bids, id }) => {
    const [stateCoefficients, setStateCoefficients] = useState({});

    useEffect(() => {
        store$.subscribe((state) => setStateCoefficients(state.coefficients));
    }, [stateCoefficients]);

    const handleAction = useCallback((cb, coefficient) => {
        cb(coefficient, id);
    }, [id]);

    return (
        bids.map(({ coefficient, minPrice }) => (
            <td key={`${id}-${coefficient}`}>
                <div
                    // eslint-disable-next-line no-useless-computed-key
                    className={clsx('formCheckbox', { ['active']: stateCoefficients[id] === coefficient })}
                >
                    <Input
                        id={id}
                        type="checkbox"
                        name={id}
                        className="checkbox"
                        onChange={() => handleAction(action, coefficient)}
                        checked={stateCoefficients[id] === coefficient}
                    />
                    <Label className="checkboxLabel">
                        { coefficient }
                        <span className="smallText">{ `${minPrice} SRC`}</span>
                    </Label>
                </div>
            </td>
        ))
    );
};

Bid.propTypes = propTypes;
Bid.displayName = 'Bid';

export default Bid;
