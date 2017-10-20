import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

//import styles from './index.scss';
//import './index.scss';

class PackageComponent extends Component {
  constructor(props){
    super(props)
  }

  clickHandler() {
    const prop1 = 5;
    const prop2 = 6;
    const index = this.props.index;

    this.props.actions.someAction(
      index,
      {
        prop1: prop1 + index,
        prop2: prop2 + index,
      }
    );

    this.props.actions.IncrementIdx();
  }


  render() {
    const {
      message,
      developer,
      dataProp,
      className,
      index,
      dataRedux
    } = this.props;


    const propsList = Array.isArray(dataProp) && dataProp.map((d, idx) => {
      const sum = d.prop1 + d.prop2;
      return (
        <li key={idx}>
          {sum}
        </li>
      );
    });


    const reduxList = Array.isArray(dataRedux) && dataRedux.map((d, idx) => {
      const sum = d.prop1 + d.prop2;
      return (
        <li key={idx}>
          {sum}
        </li>
      );
    });


    return (
      <div
        className={[
          className || '',
//          styles.containerWrapper,
          'containerWrapper'
        ].join(' ')}
      >

        <div>
          Message: {message || ''}
        </div>
        <div>
          Developer: {developer || ''}
        </div>

        The following values are diplayed form "props" received from the main application:
        <ul>
          {propsList}
        </ul>

        <input type="button" value="Increment" onClick={() => this.clickHandler()} />

        <div>
          The incremented index is: {index}
        </div>

        The following values are displayed from redux store of the standalone component/package:
        <ul>
          {reduxList}
        </ul>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  index: state.packageData.index,
  dataRedux: state.packageData.dataRedux
});


const mapDispatchToProps = (dispatch) => ({
  actions: { // wrapped in an "actions" key so we can easily distinguish between action props vs value props
    someAction: (id, valObj) => dispatch(actions.demoSomeAction(id, valObj)),
    IncrementIdx: () => dispatch(actions.IncrementIndex())
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(PackageComponent);
