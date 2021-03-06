import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PackageComponent, ButtonComponent, incrementIndexAction } from 'redux-component-pkg';

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
          wrapperClassName={styles.pakageWrapperClass}
          dataProp={this.props.appData}
          developer={developerName}
          message={msg}
        />

        <div>
          This button is implemented as part of "MyApp" demo application and increments a value stored in the package's redux store.
        </div>
        <div>
          <input
            className={styles.buttonStyles}
            type="button"
            value="Increment"
            onClick={()=> this.props.pkgActions.incrementIdx()}
          />
        </div>

        <div>
          This button is implemented as part of the "Package" and imported and utilized in MyApp. It increments a value stored in the package's redux store.
        </div>
        <div>
          {/* Note: we could even create a customized onClick function and pass it in as props */}
          <ButtonComponent
            btnValue="Increment"
            onClick={()=> this.props.pkgActions.incrementIdx()}
          />
        </div>

        <div className={styles.indexWrapperStyles}>
          Here is the standalone component's redux data (an Incremented index value): <span className={styles.indexNumberStyles}>{this.props.demoCompData.index}</span>
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


const mapDispatchToProps = (dispatch) => ({
  // wrapped in an "actions" key so we can easily distinguish between "MyApp" action props vs "package" action props
  actions: {
    // someMyAppAction: () => dispatch(actions.someMyAppAction()),
  },
  pkgActions: {
    incrementIdx: () => dispatch(incrementIndexAction())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
