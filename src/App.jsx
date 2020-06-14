import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import About from './pages/About';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/about" component={About} />
        </Switch>
    </BrowserRouter>
);

export default App;
