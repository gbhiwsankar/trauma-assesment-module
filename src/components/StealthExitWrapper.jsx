import React, { useState, useEffect, useCallback } from 'react';
import WeatherBulletin from './WeatherBulletin';

const StealthExitWrapper = ({ children }) => {
  const [isHidden, setIsHidden] = useState(false);

  const activateStealth = useCallback(() => {
    setIsHidden(true);
    // Overwrite history so clicking back doesn't reveal the site immediately
    window.history.pushState(null, '', 'https://mausam.imd.gov.in/');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        activateStealth();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activateStealth]);

  if (isHidden) {
    return <WeatherBulletin />;
  }

  return (
    <>
      <button 
        onClick={activateStealth}
        className="fixed bottom-4 right-4 z-50 bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-full shadow-lg border-2 border-white flex items-center gap-2 transition-transform hover:scale-105"
        style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}
        aria-label="Quick Exit"
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Quick Stealth Exit (ESC)
      </button>
      {children}
    </>
  );
};

export default StealthExitWrapper;
