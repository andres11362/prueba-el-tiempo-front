import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import EditProfile from './author/EditProfile';
import Newslist from './author/NewsList';
import Profile from './author/Profile';
import Dashboard from './Dashboard';
import News from './news';
import Sections from './sections';
import Users from './users';

const PrivateRoute = () => {

  return (
    <Switch>
      <Route exact path="/home">
        <Dashboard />
      </Route>
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
      <Redirect to='/home' />
    </Switch>
  )
}

export default PrivateRoute;