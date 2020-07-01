import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

import { USER_ACTION_TYPES } from '../../constants/ActionTypesConstants';

import store$ from '../../store';

import Bid from '../bid/Bid';

import './LineEvents.css';

const propTypes = {
    games: PropTypes.arrayOf(PropTypes.object).isRequired,
    coefficients: PropTypes.shape({
        id: PropTypes.number,
    }),
};

const defaultProps = {
    coefficients: {},
};

const LineEvents = ({ coefficients, games }) => {
    const handleClick = useCallback((coefficient, id) => {
        const newCoefficients = { ...coefficients };

        if (newCoefficients[id] === coefficient) {
            delete newCoefficients[id];
        } else {
            newCoefficients[id] = coefficient;
        }

        store$.dispatch({
            type: USER_ACTION_TYPES.SET_COEFFICIENTS,
            payload: { coefficients: { ...newCoefficients } },
        });
    }, [coefficients]);

    const listGames = useMemo(() => (
        games.map(({ teams, bids, id }) => (
            <tr key={id}>
                <td>{ teams.join(' vs ') }</td>
                <Bid
                    id={id}
                    bids={bids}
                    action={handleClick}
                    coefficients={coefficients}
                />
            </tr>
        ))
    ), [games, coefficients, handleClick]);

    return (
        <Table hover dark>
            <thead>
                <tr>
                    <th>Winner</th>
                    <th className="th">1</th>
                    <th className="th">X</th>
                    <th className="th">2</th>
                </tr>
            </thead>
            <tbody>
                { listGames }
            </tbody>
        </Table>
    );
};

LineEvents.propTypes = propTypes;
LineEvents.defaultProps = defaultProps;
LineEvents.displayName = 'LineEvents';

export default React.memo(LineEvents);
