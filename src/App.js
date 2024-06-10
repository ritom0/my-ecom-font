import React from 'react';
import Head from './Components/Headers/Head';
import Pages from './Components/Mainpages/Pages';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';

const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className='App'>
          <Head />
          <Pages />
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;

