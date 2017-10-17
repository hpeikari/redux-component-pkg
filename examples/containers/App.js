import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DemoComponent } from 'redux-component-pkg';

class App extends Component {
  constructor(props){
    super(props)
  }

  demoComponentMapStateToProps(state, props) {
    return {
      data: state.demoComponentData,
      x: d => d.prop1,
      y: d => d.prop2
    }
  }

  render() {
    return (
      <div>
        Standalone React/Redux Package with inbuilt actions and reducer
        <DemoComponent mapStateToProps={this.demoComponentMapStateToProps}/>
      </div>
    )
  }
}

export default connect()(App);
