import React, { useState } from 'react';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import DashboardAvatars from '../components/dashboard/DashboardAvatars';
import FilterButton from '../components/actions/FilterButton';
import Datepicker from '../components/actions/Datepicker';
import DashboardCard01 from '../components/dashboard/DashboardCard01';
import DashboardCard02 from '../components/dashboard/DashboardCard02';
import DashboardCard03 from '../components/dashboard/DashboardCard03';
import DashboardCard04 from '../components/dashboard/DashboardCard04';
import DashboardCard05 from '../components/dashboard/DashboardCard05';
import DashboardCard06 from '../components/dashboard/DashboardCard06';
import DashboardCard07 from '../components/dashboard/DashboardCard07';
import DashboardCard08 from '../components/dashboard/DashboardCard08';
import DashboardCard09 from '../components/dashboard/DashboardCard09';
import DashboardCard10 from '../components/dashboard/DashboardCard10';
import DashboardCard11 from '../components/dashboard/DashboardCard11';
import DashboardCard12 from '../components/dashboard/DashboardCard12';
import DashboardCard13 from '../components/dashboard/DashboardCard13';
import Banner from '../components/Banner';
import { Route, Switch } from 'react-router-dom';
import Users from './users';
import Sections from './sections';
import News from './news';
import RecoveryPassword from '../components/form/login/recovery';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      { isAuth && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> }

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
        <main>
          <Switch>    
            <Route exact path="/users">
              <Users />
            </Route>
            <Route exact path="/sections">
              <Sections />
            </Route>
            <Route exact path="/news">
              <News />
            </Route>
            <Route path="/recovery/:token">
              <RecoveryPassword />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;