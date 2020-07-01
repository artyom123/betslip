import React, { useEffect, useState } from 'react';
import { Jumbotron, Container, Row, Col } from 'reactstrap';

import LineEvents from '../lineEvents/LineEvents';
import Calculator from '../calculator/Calculator';

import games from '../../json/games.json';

import { GAMES_ACTION_TYPES } from '../../constants/ActionTypesConstants';

import store$ from '../../store';

const Information = () => {
    const [stateGames, setStateGames] = useState([]);
    const [stateCoefficients, setStateCoefficients] = useState({});

    useEffect(() => {
        store$.subscribe((state) => {
            setStateGames(state.games);
            setStateCoefficients(state.coefficients);
        });
    }, []);

    useEffect(() => {
        store$.dispatch({
            type: GAMES_ACTION_TYPES.SET_GAMES,
            payload: { games },
        });
    }, []);

    return (
        <Jumbotron>
            <Container>
                <Row>
                    <Col xs={9}>
                        <LineEvents games={stateGames} coefficients={stateCoefficients} />
                    </Col>
                    <Col>
                        <Calculator coefficients={stateCoefficients} />
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
};

Information.displayName = 'Information';

export default React.memo(Information);
