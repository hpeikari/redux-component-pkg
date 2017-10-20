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

#### Package Configuration
Inside the package's component we define the `mapStateToProps` function as follows to map the package's redux store to props:

```js
      // The needed portion of package's redux store
      const mapStateToProps = (state) => ({
        index: state.packageData.index,
        dataRedux: state.packageData.dataRedux
      });
```

We can then decompose the props into variables:

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


## Install
TODO:
```js
      npm install redux-component-pkg
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
            <div style={{backgroundColor: "yellow"}}>

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

## Example
Locally,

1. Clone the repo
2. $ cd examples
2. $ npm install
3. $ npm start
4. visit `localhost:3000`

You should see a component from the package (in gray background color) rendered inside MyApp (in yellow background color).

## TODO
- css modules.
- serving the package from a remote repo (eg. github).
