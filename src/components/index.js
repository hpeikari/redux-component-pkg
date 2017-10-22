import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRandomInt as getRandomIntInRange } from '../utils';
import * as actions from '../actions';

import styles from '../styles/packageName.scss';

import ButtonComponent from './button';

class PackageComponent extends Component {
  constructor(props){
    super(props);
  }

  clickHandlerMultiply() {
    const prop1 = getRandomIntInRange(1, 10);
    const prop2 = getRandomIntInRange(1, 10);

    const index = this.props.index; // you have access to props/state

    // store the object inside an array in redux store
    this.props.actions.storeObjInArray({
      prop1: prop1 + index,
      prop2: prop2 + index,
    });
  }

  clickHandlerIncrement() {
    this.props.actions.incrementIdx();
  }


  render() {
    const {
      message,
      developer,
      dataProp,
      wrapperClassName,
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
      const multiplied = d.prop1 * d.prop2;
      return (
        <span key={idx}>
          {
            `${multiplied} , `
          }
        </span>
      );
    });


    return (
      <div
        className={[
          styles.packageNameSpace || 'packageNameSpace',
          styles.packageWrapper || 'packageWrapper',
          wrapperClassName || '', // props passed from MyApp
        ].join(' ')}
      >

        <div>
          Message Props: {message || ''}
        </div>
        <div>
          Developer Props: {developer || ''}
        </div>

        The following values are diplayed form one of the props received from the main application:
        <div>
          {propsList}
        </div>

        The following buttons are rendered from one reusable component inside the package itself. The button component is configurable and can have customized styles and functionalities!

        <ButtonComponent
          btnValue="Increment"
          btnClassName={''}
          onClick={() => this.clickHandlerIncrement()}
          wrapperClassName={''}
        />

        <div>
          The incremented index stored in package's Redux store: {index}
        </div>

        <ButtonComponent
          btnValue="Multiply Random Numbers"
          wrapperClassName={''}
          onClick={() => this.clickHandlerMultiply()}
          btnClassName={
            styles.btnMultiply || 'btnMultiply'
          }
        />

        The following values are displayed from redux store of the standalone component/package:
        <div>
          {reduxList || '...'}
        </div>
      </div>
    );
  }
}

PackageComponent.propTypes = {
  message: PropTypes.string,
  developer: PropTypes.string,
  dataProp: PropTypes.array,
  className: PropTypes.string,
  index: PropTypes.number,
  dataRedux: PropTypes.array
};

const mapStateToProps = (state) => ({
  index: state.packageData.index,
  dataRedux: state.packageData.dataRedux
});

const mapDispatchToProps = (dispatch) => ({
  actions: { // wrapped in an "actions" key so we can easily distinguish between action props vs value props
    storeObjInArray: (valObj) => dispatch(actions.storeObjInArrayAction(valObj)),
    incrementIdx: () => dispatch(actions.incrementIndexAction())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PackageComponent);
