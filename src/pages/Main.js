import React, { useState } from 'react';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AuthorizationContext  = React.createContext();

function Main() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      { localStorage.getItem("token") && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
        <main className="container mx-auto">
            <AuthorizationContext.Provider value={token}>
              {!!token ? <PrivateRoute /> : <PublicRoute />}
            </AuthorizationContext.Provider>
        </main>
      </div>
    </div>
  );
}

export default Main;