import React, { Component } from 'react';
import '@progress/kendo-theme-default';
//import '@progress/kendo-theme-bootstrap';
//import '@progress/kendo-theme-material';
import './App.css';
import "@babel/polyfill";

import { TabStrip, TabStripTab } from '@progress/kendo-react-layout'
import CompBizDoc from './components/bizDoc/CompBizDoc';
import CompBizDocRev from './components/bizDocRev/CompBizDocRev';
import CompBizDocRevPage from './components/bizDocRevPage/CompBizDocRevPage';

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
        >
          <TabStripTab title="Documents">
            <CompBizDoc />
          </TabStripTab>
          <TabStripTab title="Revisions">
            <CompBizDocRev />
          </TabStripTab>
          <TabStripTab title="Pages">
            <CompBizDocRevPage />
          </TabStripTab>

        </TabStrip>
      </div>
    );
  }
}

export default App;
