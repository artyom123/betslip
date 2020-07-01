import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Label, Input } from 'reactstrap';

import './Bid.css';

const propTypes = {
    action: PropTypes.func.isRequired,
    bids: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.number.isRequired,
    coefficients: PropTypes.shape({
        id: PropTypes.number,
    }),
};

const defaultProps = {
    coefficients: {},
};

const Bid = ({ action, bids, id, coefficients }) => {
    const handleAction = useCallback((cb, coefficient) => {
        cb(coefficient, id);
    }, [id]);

    return (
        bids.map(({ coefficient, minPrice }, index) => (
            <td key={`${id}-${coefficient}`}>
                <div
                    // eslint-disable-next-line no-useless-computed-key
                    className={clsx('formCheckbox', { ['active']: coefficients[id] === coefficient })}
                >
                    <Input
                        id={`checkbox-${id}-${index}`}
                        type="checkbox"
                        className="checkbox"
                        onChange={() => handleAction(action, coefficient)}
                    />
                    <Label
                        for={`checkbox-${id}-${index}`}
                        className="checkboxLabel"
                    >
                        { coefficient }
                        <span className="smallText">{ `${minPrice} SRC`}</span>
                    </Label>
                </div>
            </td>
        ))
    );
};

Bid.propTypes = propTypes;
Bid.defaultProps = defaultProps;
Bid.displayName = 'Bid';

export default React.memo(Bid);
