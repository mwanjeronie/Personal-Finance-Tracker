import React from 'react';
import Buttons from './components/Buttons';
import Header from './components/Header';
// import List from './components/List';
// import './App.css';
import DisplayTransactions from './components/DisplayTransactions';
// import { Transaction } from './components/DisplayTransactions';
const App: React.FC = () => {
  return (
    <>
      <Header />
      <Buttons />
      <DisplayTransactions transactions={[{ id: 1, description: 'Sample transaction', amount: 100 }]} />
    </>
  );
}

export default App;