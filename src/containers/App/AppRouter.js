import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';
import getDevRouters from '../../customApp/router';

class AppRouter extends React.Component {
  render() {
    const { url } = this.props;
    return (
      <Switch>
        <Route
          exact
          path={`${url}/`}
          component={asyncComponent(() => import('../Widgets/index.js'))}
        />
        
        <Route
          exact
          path={`${url}/table_fb`}
          component={asyncComponent(() => import('../Tables/fbTables/'))}
        />
        <Route
          exact
          path={`${url}/table_ant`}
          component={asyncComponent(() => import('../Tables/antTables'))}
        />
        
        <Route
          exact
          path={`${url}/contacts`}
          component={asyncComponent(() => import('../Contacts'))}
        />
        
        <Route
          exact
          path={`${url}/ReactChart2`}
          component={asyncComponent(() => import('../Charts/reactChart2'))}
        />
        
        {getDevRouters(url)}
      </Switch>
    );
  }
}

export default AppRouter;
