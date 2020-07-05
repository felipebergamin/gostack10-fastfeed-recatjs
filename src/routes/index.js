import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './Route';
import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import CouriersList from '~/pages/CouriesList';
import AddCourier from '~/pages/AddCourier';
import Recipients from '~/pages/Recipients';
import RecipientForm from '~/pages/RecipientForm';
import OrdersList from '~/pages/OrdersList';
import AddOrder from '~/pages/AddOrder';
import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Dashboard} exact isPrivate />
        <Route path="/login" component={Login} exact />
        <Route path="/couriers" component={CouriersList} exact isPrivate />
        <Route path="/couriers/add" component={AddCourier} exact isPrivate />
        <Route
          path="/couriers/:id/edit"
          component={AddCourier}
          exact
          isPrivate
        />
        <Route path="/recipients" component={Recipients} exact isPrivate />
        <Route
          path="/recipients/add"
          component={RecipientForm}
          exact
          isPrivate
        />
        <Route path="/orders" component={OrdersList} exact isPrivate />
        <Route path="/orders/add" component={AddOrder} exact isPrivate />
        <Route path="/delivery-problems" component={Problems} exact isPrivate />
      </Switch>
    </BrowserRouter>
  );
}
