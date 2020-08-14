import React from 'react';
import { Route } from 'react-router-dom';
import SideDrawerWithHeader from '../components/side-drawer';
import { User, RoleMgt, AccessDenied } from '../screens';
import { useSelector } from 'react-redux';


export default () => {

    const routes = [
        { id: 2, component: (props) => <User access={props} />, url: "/users" },
        { id: 3, component: (props) => <RoleMgt access={props} />, url: "/role-management" }
    ]

    const { user } = useSelector(state => state.userDetails);

    return (
        <>
            <Route path="/" component={SideDrawerWithHeader} />
            {
                routes.map((route, index) => {
                    let accessProperties = "";
                    user.access_modules.map((module) => { if (module.id === route.id) accessProperties = module; })
                    return <Route key={index} exact path={route.url} render={accessProperties.read ? () => route.component(accessProperties) : () => <AccessDenied />} />
                })
            }
        </>
    )
}
