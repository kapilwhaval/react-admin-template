import React from 'react';
import { Route } from 'react-router-dom';
import SideDrawerWithHeader from '../components/side-drawer';
import { Dashboard, AccessDenied, RoleMgt } from '../screens';
import { useSelector } from 'react-redux';


export default () => {

    const routes = [
        { id: 1, component: <RoleMgt />, url: "/role-management" },
        { id: 2, component: <Dashboard />, url: "/dashboard" }
    ]

    const { user } = useSelector(state => state.userDetails);

    return (
        <>
            <Route path="/" component={SideDrawerWithHeader} />
            {
                routes.map((route, index) => {
                    let isAllowed = false;
                    user.access_modules.map(({ id }) => { 
                        if (id === route.id) isAllowed = true;
                        return null;
                    })
                    return <Route key={index} exact path={route.url} render={isAllowed ? () => route.component : () => <AccessDenied />} />
                })
            }
        </>
    )
}
