import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from 'reactstrap';

import { USER_ACTION_TYPES } from '../../constants/ActionTypesConstants';

import store$ from '../../store';

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

        store$.dispatch({
            type: USER_ACTION_TYPES.SET_COEFFICIENTS,
            payload: { coefficients: {} },
        });
    }, []);

    return (
        <Form>
            <FormGroup>
                <Label>Odds</Label>
                <Input type="text" value={odds} disabled />
            </FormGroup>
            <FormGroup>
                <Label>Stake (SRC)</Label>
                <Input type="text" onChange={handleChange} value={stake} />
            </FormGroup>
            <FormGroup row>
                <div className="profit">{ `Profit: ${profit}` }</div>
            </FormGroup>
            <div>
                <FormGroup>
                    <Button
                        className="button"
                        variant="secondary"
                        onClick={handleReset}
                    >
                        Cancal
                    </Button>
                </FormGroup>
                <FormGroup>
                    <Button
                        className="button"
                        variant="success"
                        disabled={!profit}
                    >
                        Place Bet
                    </Button>
                </FormGroup>
            </div>
        </Form>
    );
};

Calculator.propTypes = propTypes;
Calculator.defaultProps = defaultProps;
Calculator.displayName = 'Calculator';

export default Calculator;
