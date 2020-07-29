import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Main from './Main';
import { store, persistor } from './store';

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;