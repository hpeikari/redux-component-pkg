# redux-component-pkg

It's a simple example of how we can create a standalone React component in combination with Redux. i.e. this is a component boilerplate, that can be used in different apps. I would refer to it as a ```"package"``` in the rest of the documents as well as code and comments.

## Usage
The basic idea is import the component from the package and pass a list of predefined props to our component from the hosting application. Also, we should import the package's reducer and combine it with that of main hosting application. I would refer to the main hosting application as ```"MyApp"``` in the rest of docs, code and comments.


##### Component
```js
  import { PackageComponent } from 'redux-component-pkg';

  <PackageComponent
    dataProp={this.props.appData}
    className={''}
    message={msg}
  />
```

##### Reducer
And also combine reducers by data key:

```js
  import { packageReducer } from 'redux-component-pkg';

  const reducers = combineReducers({
    myAppData: myAppReducer,
    packageData: packageReducer
  });

```

##### actions



## Package Setup

Dependencies are exported from ```../src/index.js```:
```js
// components
  export { default as PackageComponent } from './components';
  export { default as ButtonComponent } from './components/button';

  // actions
  export { storeObjInArrayAction, incrementIndexAction } from './actions';

  // reducers
  export { default as packageReducer } from './reducers';
```

Inside the package's component we define the `mapStateToProps` function as follows to map the package's internal redux store to props:

```js
  // components/index.js

  // The needed portion of package's redux store
  const mapStateToProps = (state) => ({
    index: state.packageData.index,
    dataRedux: state.packageData.dataRedux
  });
```

Then we can for example use ```"this.props.dataRedux"``` to access the props value.
Or we can decompose the props into variables and very easily use them in the code:

```js
  const {
    // from props passed from MyApp
    message,
    developer,
    dataProp,

    // we can even configure the package's components styles from MyApp
    wrapperClassName,

    // from package's redux
    index,
    dataRedux
  } = this.props;
```

##### SCSS and Styles

You can create an scss file for each component in the package, then import the scss file into the main global scss file (PackageName.scss).
Remember to change the PackageName.scss file to the actual package name, and also import it in each individual component. This will be a great way to indentify the css class names in the MyApp if css-modules is used. The package is configured in a way that it will be compatible with projects whether they use css-modules or not.

Example:

```js
  // packageName.scss

  :global{ // The "global" mode will make it compatible with all projects.
    @import './colors.scss';
    @import '../components/button.scss';
    @import '../components/index.scss';
  }

```

The above file should be imported in each individual component:

```js
  import styles from '../styles/packageName.scss';
  .
  .
  <div
    className={[
      styles.someClassOne || 'someClassOne',
      styles.someClassTwo || 'someClassTwo',
      //...etc
    ].join(' ')}
  />
```

NOTE: If css-modules is enabled then ```"styles.someClassOne"``` will be used, otherwise ```"someClassOne"``` will be used.


## Install

The easiest way to use this package is to install it from NPM and include it in your own React build process (using Browserify, Webpack, etc).

```js
  npm install --save git+https://github.com/hpeikari/redux-component-pkg.git
```

You can also use the standalone build by including ```dist/packageComponent.min.js``` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

TODO: Instructions needs to be verified and tested!

## Example

Simple example of usage in MyApp:

```js
  import React from 'react'
  import { render } from 'react-dom'
  import { createStore, combineReducers } from 'redux'
  import { Provider } from 'react-redux'
  import App from './containers/App'
  import { packageReducer } from 'redux-component-pkg' // import package's reducer


  const reducers = combineReducers({
    myAppData: myAppReducer,
    packageData: packageReducer // combine with other reducers
  });


  const store = createStore(
    reducers,
  );


  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
```
##### Reducer

```js
  const initialState = {
    myAppData: [
      { prop1: 1, prop2: 2 },
      { prop1: 2, prop2: 3 },
      { prop1: 3, prop2: 4 },
      { prop1: 4, prop2: 5 }
    ]
  };

  export default function myAppReducer(state = initialState, action) {
    switch (action.type) {
      default:
        return state;
    }
  }
```

##### Class App
```js
  // inside ../containers/App.js

  import React, { Component } from 'react';
  import { connect } from 'react-redux';
  import { PackageComponent } from 'redux-component-pkg'; // import package's component

  import styles from './app.scss';

  class App extends Component {
    constructor(props){
      super(props);
    }

    render() {
      const msg = 'Standalone React/Redux Package with inbuilt actions and reducer';

      return (
        <div style={{backgroundColor: "grey"}}>

          {/* use the package's component and pass props */}
          <PackageComponent
            wrapperClassName={styles.pakageWrapperClass}
            dataProp={this.props.appData}
            developer={developerName}
            message={msg}
          />

        </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    appData: state.myAppData.myAppData,
  });

  export default connect(mapStateToProps, null)(App);
```

## Demo
Locally, Clone the repo and then inside ```"package"``` folder:

1. $ cd packages
2. $ npm install
3. $ npm run-script build

then inside ```"example"``` folder:
2. $ npm install
3. $ npm run-script start
4. then visit ```localhost:3000```

You should see a component from the package (in light blue background color) rendered inside MyApp (in grey background color).

## TODO
- serving the package from a remote repo (eg. github).

## Sample screen shot
![](http://oi64.tinypic.com/imjjm9.jpg)
