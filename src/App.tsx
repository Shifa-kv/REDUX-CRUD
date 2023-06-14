import React, { useState } from 'react';
import './App.css';
import Registration from './Pages/Registration';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <Provider store={Store}>
        <div className="App">
          <Registration />
        </div>
      </Provider>
  );
}

export default App;
