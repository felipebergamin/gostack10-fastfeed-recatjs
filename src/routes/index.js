import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './Route';
import Home from '../App';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
    </BrowserRouter>
  );
}
