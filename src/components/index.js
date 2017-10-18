import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

//import styles from './index.scss';

class DemoComponent extends Component {
  constructor(props){
    super(props)
  }


  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { data, x, y } = this.props;

    const list = Array.isArray(data) && data.map((d, index) => {
      const sum = x(d) + y(d);
      return (<li key={index}>{sum}</li>);
    });

    return (
      <div>
        Hamed P
        <ul>
          {list}
        </ul>
        <input type="button" value="click me" onClick={() => this.props.someAction(4, {prop1: 10, prop2: 15})} />
      </div>
    );
  }
}


function mapStateToProps(state, props) {
  // required props
  //   data - array of objects, eg: [{prop1: 1, prop2: 2}, {prop1: 3, prop2: 4}, ...]
  //   x - query function of the first data prop, eg: x = d => d.prop1
  //   y - query function of the second data prop, eg: y = d => d.prop2
  return props.mapStateToProps(state, props);
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    someAction: (id, val) => dispatch(actions.demoSomeAction(id, val))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DemoComponent);
