import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Row,
    Col,
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
        if (odds || stake) {
            setOdds(0);
            setStake('');
            setProfit('');

            store$.dispatch({
                type: USER_ACTION_TYPES.SET_COEFFICIENTS,
                payload: { coefficients: {} },
            });
        }
    }, [odds, stake]);

    return (
        <Form>
            <FormGroup>
                <Label>Odds</Label>
                <Input type="text" value={odds} disabled />
            </FormGroup>
            <FormGroup>
                <Label for="stake">Stake (SRC)</Label>
                <Input id="stake" type="text" onChange={handleChange} value={stake} />
            </FormGroup>
            <Row>
                <Col>
                    <div className="profit">{ `Profit: ${profit}` }</div>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Button
                        color="secondary"
                        className="button"
                        onClick={handleReset}
                    >
                        Cancal
                    </Button>
                </Col>
                <Col md={6}>
                    <Button
                        color="success"
                        className="button"
                        disabled={!profit}
                    >
                        Place Bet
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

Calculator.propTypes = propTypes;
Calculator.defaultProps = defaultProps;
Calculator.displayName = 'Calculator';

export default React.memo(Calculator);
