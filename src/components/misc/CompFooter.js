import React from 'react';
import { connect } from 'react-redux';
import './CompFooter.css';
import actionControl from '../../actions/actionControl';
import CompClock from './CompClock';

class CompFooter extends React.Component {

  //==========================================================
  // render for CompBizDoc
  render() {
    return (
      <div>
        <div className="drp-footer-text">
          <br/>
          {this.props.uid}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <CompClock interval="5000"/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {this.props.ver}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const userInfo = actionControl.getUserInfo(state);
  const uid = userInfo && userInfo.uid;
  return {
    uid,
  }
}

const mapDispatchToProps = null;

const Comp_redux =
  connect(mapStateToProps, mapDispatchToProps)(CompFooter);
export default Comp_redux;
