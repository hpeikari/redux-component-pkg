import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PackageComponent } from 'redux-component-pkg';

import styles from './app.scss';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const msg_1 = 'Standalone React/Redux Package with inbuilt actions and reducer';
    const developerName_1 = 'Hamed';

    const developerName_2 = 'P****';

    return (
      <div className={styles.containerWrapper}>

        {this.props.description}

        <PackageComponent
          wrapperClassName={''}
          dataProp={this.props.appData}
          developer={developerName_1}
          message={msg_1}
        />

        <PackageComponent
          wrapperClassName={styles.pakageWrapperClass}
          dataProp={this.props.appData}
          developer={developerName_2}
          message={''}
        />

        <div>
          The button is implemented as part of the standalone component and Increments a value stored in the standalone coponent's redux store.
          The value is imported from the standalone component's redux into the main application.
        </div>

        <div className={styles.indexStyles}>
          Here is the standalone component's redux data (an Incremented index value): {this.props.demoCompData.index}
          <div>
            This value is imported from the package's Redux store, and merged with MyApp's redux store!
          </div>
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
