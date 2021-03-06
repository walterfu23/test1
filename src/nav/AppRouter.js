import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import MenuNavContainer from './MenuNavContainer';
import CompBizDoc from '../components/bizDoc/CompBizDoc';
import CompBizDocRev from '../components/bizDocRev/CompBizDocRev';
import CompBizDocRevPage from '../components/bizDocRevPage/CompBizDocRevPage';

const AppRouter = () => (
  <HashRouter>
    <MenuNavContainer>
      <Switch>
        <Route exact={true} path="/" component={CompBizDoc} />
        <Route exact={true} path="/bizDocRev" component={CompBizDocRev} />
        <Route exact={true} path="/bizDocRevPage" component={CompBizDocRevPage} />
      </Switch>
    </MenuNavContainer>
  </HashRouter>
);

export default AppRouter;
