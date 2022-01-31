import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import RecoveryPassword from '../components/form/login/recovery';
import ForgetPage from './auth/forgotPage';
import LoginPage from './auth/loginPage';
import NewsPage from './publicPage/newsPage';
import AuthorPage from './publicPage/author';
import CategoryPage from './publicPage/category';
import PublicPage from './publicPage/main';

const PublicRoute = () => {
    return (
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/forget">
                <ForgetPage />
            </Route>
            <Route exact path="/recovery/:token">
                <RecoveryPassword />
            </Route>
            <Route exact path="/category/:seccion">
                <CategoryPage />
            </Route>
            <Route exact path="/author/:author">
                <AuthorPage />
            </Route>
            <Route exact path="/news/:id">
                <NewsPage />
            </Route>
            <Route path="/" component={PublicPage} />
            <Redirect to='/' />
        </Switch>
    )
}

export default PublicRoute;