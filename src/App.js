import React, { Component } from 'react';
import '@progress/kendo-theme-default';
//import '@progress/kendo-theme-bootstrap';
//import '@progress/kendo-theme-material';
import './App.css';
import "@babel/polyfill";

import { TabStrip, TabStripTab } from '@progress/kendo-react-layout'
import CompFooter from './components/misc/CompFooter';
import CompBizDoc from './components/bizDoc/CompBizDoc';
import CompBizDocRev from './components/bizDocRev/CompBizDocRev';
import CompBizDocRevPage from './components/bizDocRevPage/CompBizDocRevPage';
import CompBizPageField from './components/bizPageField/CompBizPageField';
import CompTopLevelList from './components/topLevelList/CompTopLevelList';
import CompCategory from './components/category/CompCategory';
import CompSubCategory from './components/subCategory/CompSubCategory';
import CompJob from './components/job/CompJob';
import CompJobTopLevelList from './components/jobTopLevelList/CompJobTopLevelList';
import CompJobSubcatDoc from './components/jobSubcatDoc/CompJobSubcatDoc';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelected: 0,
    }
  }

  handleTabSelected = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      tabSelected: event.selected,
    }));
  }

  render() {
    return (
      <div className="App">
        <TabStrip
          selected={this.state.tabSelected}
          onSelect={this.handleTabSelected}
          animation={false}
        >
          <TabStripTab title="Docs">
            <CompBizDoc />
          </TabStripTab>
          <TabStripTab title="Revs">
            <CompBizDocRev />
          </TabStripTab>
          <TabStripTab title="Pages">
            <CompBizDocRevPage />
          </TabStripTab>
          <TabStripTab title="Fields">
            <CompBizPageField />
          </TabStripTab>
          <TabStripTab title="Lists">
            <CompTopLevelList />
          </TabStripTab>
          <TabStripTab title="Cats">
            <CompCategory />
          </TabStripTab>
          <TabStripTab title="SubCats">
            <CompSubCategory />
          </TabStripTab>
          <TabStripTab title="Jobs">
            <CompJob />
          </TabStripTab>
          <TabStripTab title="Job-Lists">
            <CompJobTopLevelList />
          </TabStripTab>
          <TabStripTab title="Job-SubCat-Doc">
            <CompJobSubcatDoc />
          </TabStripTab>

        </TabStrip>
        <CompFooter ver="0.12"/>
      </div>
    );
  }
}

export default App;
