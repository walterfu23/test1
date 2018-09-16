import React, {Component } from 'react';
import {withRouter} from 'react-router-dom';
import {Menu, MenuItem} from '@progress/kendo-react-layout';

class MenuNavContainer extends Component {
  onSelect = (event) => {
    this.props.history.push(event.item.data.route);
  }

  render() {
    return (
      <div>
        <Menu onSelect={this.onSelect}>
          <MenuItem text="Documents" data={{route: '/'}} />
          <MenuItem text="Revisions" data={{route: '/bizDocRev'}} />
          <MenuItem text="Pages" data={{route: '/bizDocRevPage'}} />
        </Menu>
        <div style={{padding: 10}}>{this.props.children}</div>
      </div>
    );
  }
}

export default withRouter(MenuNavContainer);

