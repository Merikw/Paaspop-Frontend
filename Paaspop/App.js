import React, { Component } from 'react';
import { Provider } from 'react-redux';

import InitialNavigator from "./src/utilities/navigation/InitialNavigator"
import configureStore from "./src/store/configureStore"

const store = configureStore();

class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <InitialNavigator />
      </Provider>
    )
  }
}

export default App
