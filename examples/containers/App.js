import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PackageComponent } from 'redux-component-pkg';

import styles from './app.scss';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const msg = 'Standalone React/Redux Package with inbuilt actions and reducer';
    const developerName = 'Hamed P';

    return (
      <div className={styles.containerWrapper}>

        {this.props.description}

        <PackageComponent
          className={''}
          dataProp={this.props.appData}
          developer={developerName}
          message={msg}
          />

        <div>
          The button is implemented as part of the standalone component and Increments a value stored in the standalone coponent's redux store.
          The value is imported from the standalone component's redux into the main application.
        </div>

        <div className={styles.indexStyles}>
          Here is the standalone component's redux data (an Incremented index value): {this.props.demoCompData.index}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  description: state.myAppData.appDesc,
  appData: state.myAppData.myAppData,
  demoCompData: state.packageData
});

export default connect(mapStateToProps, null)(App);
