import React from 'react';
import DataProvider from './components/DataProvider';
import Root from './components/Root';
import { DataContext } from './utils/contexts';
import './App.css';

function App() {
  return (
    <DataProvider
      render={(data) => (
        <DataContext.Provider value={data}>
          <Root />
        </DataContext.Provider>
      )}
    />
  );
}

export default App;
