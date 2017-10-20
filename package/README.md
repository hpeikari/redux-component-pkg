# redux-component-pkg

It's a simple example of how we can create a standalone React component in combination with Redux. i.e. this is a component boilerplate, that can be used in different apps. I would refer to it as a ```"package"``` in the rest of the documents as well as code and comments.

# Usage
The basic idea is import the component from the package and pass a list of predefined props to our component from the hosting application. I would refer to the main hosting application as ```"MyApp"``` in the rest of docs, code and comments.


#### Component
```js
      import { PackageComponent } from 'redux-component-pkg';

      <PackageComponent
        dataProp={this.props.appData}
        className={''}
        message={msg}
      />

```

#### Reducer
And also combine reducers by data key:

```js
      import { packageReducer } from 'redux-component-pkg';

      const reducers = combineReducers({
        myAppData: myAppReducer,
        packageData: packageReducer
      });

```

#### Package changes
Inside the package's component we define the `mapStateToProps` function as follows to map the package's redux store to props:

```js
      // The needed portion of package's redux store
      const mapStateToProps = (state) => ({
        index: state.packageData.index,
        dataRedux: state.packageData.dataRedux
      });
```

We can then decompose the props into variables and very easily use them in the code:

```js
      const {
        // from props passed from MyApp
        message,
        className,
        dataProp,

        // from package's redux
        index,
        dataRedux
      } = this.props;
```

#### SCSS and Styles

You can create an scss file for each component in the package, then import the scss file into the main global scss file (PackageName.scss).
Remember to change the PackageName.scss file to the actual package name, and also import it in each individual component. This will be a great way to indentify the css class names in the MyApp if css-modules is used. The package is configured in a way that it will be compatible with projects wether they use css-modules or not.

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

NOTE: If css-modules is enabled then ```"styles.someClass"``` will be used, otherwise ```"someClass"``` will be used.


## Install

TODO:
```js
      npm install --save redux-component-pkg
```

## Example

Simple example of usage in MyApp:

```js
      import React from 'react'
      import { render } from 'react-dom'
      import { createStore, combineReducers } from 'redux'
      import { Provider } from 'react-redux'
      import App from './containers/App'
      import { packageReducer } from 'redux-component-pkg'


      const reducers = combineReducers({
        myAppData: myAppReducer,
        packageData: packageReducer
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
      import React, { Component } from 'react';
      import { connect } from 'react-redux';
      import { PackageComponent } from 'redux-component-pkg';

      class App extends Component {
        constructor(props){
          super(props);
        }

        render() {
          const msg = 'Standalone React/Redux Package with inbuilt actions and reducer';

          return (
            <div style={{backgroundColor: "grey"}}>

              <PackageComponent
                className={''}
                dataProp={this.props.appData}
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
Locally,

1. Clone the repo
2. $ cd examples
2. $ npm install
3. $ npm start
4. visit `localhost:3000`

You should see a component from the package (in light blue background color) rendered inside MyApp (in grey background color).

## TODO
- serving the package from a remote repo (eg. github).

## Sample screen shot
![](http://oi64.tinypic.com/imjjm9.jpg)
