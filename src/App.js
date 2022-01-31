import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';

import './css/style.scss';


// Import pages
import Main from './pages/Main';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
        <Main />
    </>
  );
}

export default App;
