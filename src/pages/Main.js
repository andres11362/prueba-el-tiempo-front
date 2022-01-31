import React, { useState } from 'react';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AuthorizationContext  = React.createContext();

/**
   * Componente central de la aplicación
   * @param {*} props 
   * @returns 
*/
function Main() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      { localStorage.getItem("token") && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">


        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
         {/*  Administra mientras un context que tipo de ruta esta activa si publica o privada
              Todo eso dependiendo si esta autenticado o no
         */}
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