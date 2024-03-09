import React, { useState, useEffect } from 'react';
import {
  FaSun,
  FaMoon,
} from 'react-icons/fa';

function Navbar() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return (
      storedTheme ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')
    );
  });

  // Add a state variable to track the active section
  const [activeSection, setActiveSection] = useState('Home');

  const handleThemeSwitch = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    console.log('New Theme:', newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      // Update the theme only if it's not set in localStorage
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    // Update the theme only if it's not set in localStorage
    if (!localStorage.getItem('theme')) {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className='empty-class'>
      <div className='w-full h-[80px] flex justify-evenly items-center px-4 scale-100 bg-blue-300 text-grey-50 font-bold dark:bg-ice-dark rounded-full'>
        {/* Dark Mode Switch */}
        <h1 className='text-xl'>Class Scheduler</h1>
        <div className='flex px-4 text-grey-50 hover:scale-150 duration-150 hover:text-amber-300 z-1'>
          {theme === 'light' ? (
            <FaSun
              onClick={handleThemeSwitch}
              className='cursor-pointer'
              size={30}
            />
          ) : (
            <FaMoon
              onClick={handleThemeSwitch}
              className='cursor-pointer'
              size={30}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
