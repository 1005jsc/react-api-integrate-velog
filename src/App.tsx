import React from 'react';
import './App.css';
import { UserProvider } from './UserContext';
import Users from './Users';
import { Users2 } from './Users2';
import { Users3 } from './Users3';
import { Users4 } from './Users4';

function App() {
  return (
    <UserProvider>
      <div className='App'>
        {/* <Users /> */}
        {/* <Users2 /> */}
        {/* <Users3 /> */}
        <Users4 />
      </div>
    </UserProvider>
  );
}

export default App;
