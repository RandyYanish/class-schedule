// packages
import React from 'react';
import { Outlet } from 'react-router-dom';
// components
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-b from-steel-50 to-steel-light dark:from-gray-950 dark:to-slate-800 duration-500 z-0'>
      <nav className='p-4 z-50 sticky top-0'>
        <Navbar />
      </nav>
      <div className='flex-grow p-4 z-1'>
        {' '}
        {/* Container for Outlet content */}
        <div className='max-h-full '>
          <Outlet /> {/* Renders child routes */}
        </div>
      </div>
    </div>
  );
}

export default App;
