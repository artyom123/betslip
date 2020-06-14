import React, { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import { USER_ACTION_TYPES } from '../../constants/ActionTypesConstants';

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
    const dispatch = useDispatch();

    const handleClick = useCallback((coefficient, id) => {
        const newCoefficients = { ...coefficients };

        if (newCoefficients[id] === coefficient) {
            delete newCoefficients[id];
        } else {
            newCoefficients[id] = coefficient;
        }

        dispatch({
            type: USER_ACTION_TYPES.SET_COEFFICIENTS,
            payload: { coefficients: { ...newCoefficients } },
        });
    }, [coefficients, dispatch]);

    const listGames = useMemo(() => (
        games.map(({ teams, bids, id }) => (
            <tr key={id}>
                <td>{ teams.join(' vs ') }</td>
                <Bid
                    id={id}
                    bids={bids}
                    action={handleClick}
                />
            </tr>
        ))
    ), [games, handleClick]);

    return (
        <Table striped bordered hover variant="dark">
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

export default LineEvents;
