import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './Route';
import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Dashboard} exact isPrivate />
        <Route path="/login" component={Login} exact />
      </Switch>
    </BrowserRouter>
  );
}
