import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from '../services/history';
import AuthMain from './login/AuthMain';
import Login from './login/Login';
import Register from './login/Register';
import UserInfo from './login/UserInfo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/userinfo" component={UserInfo} />
            <Route path="/" component={AuthMain} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
