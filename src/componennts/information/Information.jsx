import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';

import LineEvents from '../lineEvents/LineEvents';
import Calculator from '../calculator/Calculator';

import games from '../../json/games.json';

import { GAMES_ACTION_TYPES } from '../../constants/ActionTypesConstants';

const Information = () => {
    const dispatch = useDispatch();

    const { coefficients } = useSelector((state) => ({
        coefficients: state.userReducer.coefficients,
    }), shallowEqual);

    useEffect(() => {
        dispatch({
            type: GAMES_ACTION_TYPES.SET_GAMES,
            payload: { games },
        });
    }, [dispatch]);

    return (
        <Jumbotron>
            <Container>
                <Row>
                    <Col xs={9}>
                        <LineEvents games={games} coefficients={coefficients} />
                    </Col>
                    <Col>
                        <Calculator coefficients={coefficients} />
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
};

Information.displayName = 'Information';

export default Information;
