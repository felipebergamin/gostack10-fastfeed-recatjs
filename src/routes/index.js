import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './Route';
import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import CouriersList from '~/pages/CouriesList';
import AddCourier from '~/pages/AddCourier';
import Recipients from '~/pages/Recipients';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Dashboard} exact isPrivate />
        <Route path="/login" component={Login} exact />
        <Route path="/couriers" component={CouriersList} exact isPrivate />
        <Route path="/couriers/add" component={AddCourier} exact isPrivate />
        <Route path="/recipients" component={Recipients} exact isPrivate />
      </Switch>
    </BrowserRouter>
  );
}
