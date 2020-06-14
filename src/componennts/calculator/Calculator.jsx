import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Col, Button } from 'react-bootstrap';

import { USER_ACTION_TYPES } from '../../constants/ActionTypesConstants';

import './Calculator.css';

const propTypes = {
    coefficients: PropTypes.shape({
        id: PropTypes.number,
    }),
};

const defaultProps = {
    coefficients: {},
};

const Calculator = ({ coefficients }) => {
    const dispatch = useDispatch();

    const [odds, setOdds] = useState(0);
    const [stake, setStake] = useState('');
    const [profit, setProfit] = useState('');

    useEffect(() => {
        const coefficientsValue = Object.values(coefficients);

        if (coefficientsValue.length) {
            const singleCoefficient = coefficientsValue.reduce(
                (prevCoefficient, nextCoefficient) => prevCoefficient * nextCoefficient, 1,
            );

            setOdds(singleCoefficient.toFixed(2));
        } else {
            setOdds(0);
        }
    }, [coefficients]);

    useEffect(() => {
        if (odds && stake) {
            setProfit(odds * stake);
        }
    }, [odds, stake]);

    const handleChange = useCallback(({ target }) => {
        const regex = /^\d+$/;

        if (regex.test(target.value)) {
            setStake(target.value);
        } else if (target.value === '') {
            setStake('');
        }
    }, []);

    const handleReset = useCallback(() => {
        setOdds(0);
        setStake('');
        setProfit('');

        dispatch({
            type: USER_ACTION_TYPES.SET_COEFFICIENTS,
            payload: { coefficients: {} },
        });
    }, [dispatch]);

    return (
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formOdds">
                    <Form.Label>Odds</Form.Label>
                    <Form.Control type="text" value={odds} disabled />
                </Form.Group>
                <Form.Group as={Col} controlId="formStake">
                    <Form.Label>Stake (SRC)</Form.Label>
                    <Form.Control type="text" onChange={handleChange} value={stake} />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <div className="profit">{ `Profit: ${profit}` }</div>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Button
                        className="button"
                        variant="secondary"
                        onClick={handleReset}
                    >
                        Cancal
                    </Button>
                </Form.Group>
                <Form.Group as={Col}>
                    <Button
                        className="button"
                        variant="success"
                        disabled={!profit}
                    >
                        Place Bet
                    </Button>
                </Form.Group>
            </Form.Row>
        </Form>
    );
};

Calculator.propTypes = propTypes;
Calculator.defaultProps = defaultProps;
Calculator.displayName = 'Calculator';

export default Calculator;
