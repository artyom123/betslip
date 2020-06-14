import React, { useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FormCheck } from 'react-bootstrap';

import './Bid.css';

const propTypes = {
    action: PropTypes.func.isRequired,
    bids: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.number.isRequired,
};

const Bid = ({ action, bids, id }) => {
    const { coefficients } = useSelector((state) => ({
        coefficients: state.userReducer.coefficients,
    }), shallowEqual);

    const handleAction = useCallback((cb, coefficient) => {
        cb(coefficient, id);
    }, [id]);

    return (
        bids.map(({ coefficient, minPrice }) => (
            <td key={`${id}-${coefficient}`}>
                <FormCheck
                    // eslint-disable-next-line no-useless-computed-key
                    className={clsx('formCheckbox', { ['active']: coefficients[id] === coefficient })}
                >
                    <FormCheck.Input
                        id={id}
                        type="checkbox"
                        name={id}
                        className="checkbox"
                        onChange={() => handleAction(action, coefficient, id)}
                        checked={coefficients[id] === coefficient}
                    />
                    <FormCheck.Label className="checkboxLabel">
                        { coefficient }
                        <span className="smallText">{ `${minPrice} SRC`}</span>
                    </FormCheck.Label>
                </FormCheck>
            </td>
        ))
    );
};

Bid.propTypes = propTypes;
Bid.displayName = 'Bid';

export default Bid;
