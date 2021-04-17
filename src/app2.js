import React, { Component, useMemo } from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers';
import RouterComponent from './Router';

  class App extends Component {

    render() {
    return (
      <Provider store={createStore(reducers)}>
        <RouterComponent />        
      </Provider>
    )}
  }

  export default App;