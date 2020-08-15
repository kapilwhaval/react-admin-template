import React from 'react';
import { Login } from '../screens';
import { Route, Redirect } from 'react-router-dom';

export default () => (
    <>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route exact path="/login" component={Login} />
    </>
);