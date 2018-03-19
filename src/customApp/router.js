import React from 'react';
import { Route } from 'react-router-dom';
import asyncComponent from '../helpers/AsyncFunc';

export default function(url) {
  const routers = [];
  routers.push(
    <Route
      exact
      key="gitSearch"
      path={`${url}/production`}
      component={asyncComponent(() => import('./containers/DataLoad'))}
    />
  );
  routers.push(
    <Route
      exact
      key="gitSearch"
      path={`${url}/development`}
      component={asyncComponent(() => import('./containers/DevServer'))}
    />
  );
  routers.push(
    <Route
      exact
      key="blank_page"
      path={`${url}/blank_page`}
      component={asyncComponent(() => import('./containers/blankPage'))}
    />
  );
  routers.push(
    <Route
      exact
      key="blank_page"
      path={`${url}/profile`}
      component={asyncComponent(() => import('./containers/profile'))}
    />
  );
  return routers;
}
