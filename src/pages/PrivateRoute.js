import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import EditProfile from './author/EditProfile';
import Newslist from './author/NewsList';
import Profile from './author/Profile';
import Dashboard from './Dashboard';
import News from './news';
import Sections from './sections';
import Users from './users';

/**
 * Rutas privadas, solo se acceden a ellas 
 * si se esta autenticado
 * @returns 
 */
const PrivateRoute = () => {

  return (
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
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/edit-profile">
        <EditProfile />
      </Route>
      <Route path="/my-news">
        <Newslist />
      </Route>
      <Route path="/home">
        <Dashboard />
      </Route>
      <Redirect to='/' />
    </Switch>
  )
}

export default PrivateRoute;