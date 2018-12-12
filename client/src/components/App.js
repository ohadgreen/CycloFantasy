import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../services/history';
import { Container } from 'semantic-ui-react'
import AuthMain from './login/AuthMain';
import Login from './login/Login';
import Register from './login/Register';
import UserInfo from './login/UserInfo';
import RaceBetMain from './raceInfo/RaceBetMain';
import RiderImage from './test/RiderImageTest';

class App extends Component {
  render() {
    return (
      <Container>
        <Router history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/userinfo" component={UserInfo} />
            <Route path="/racebet" component={RaceBetMain} />
            <Route path="/riderimage" component={RiderImage} />
            <Route path="/" component={Login} />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
