import React from 'react';
import { Route } from 'react-router-dom';
import SideDrawerWithHeader from '../components/side-drawer';
import { User, RoleMgt, AccessDenied } from '../screens';
import { useSelector } from 'react-redux';


export default () => {

    const routes = [
        { id: 1, component: (props) => <User access={props} />, url: "/users" },
        { id: 2, component: (props) => <RoleMgt access={props} />, url: "/role-management" }
    ]

    const { access_modules, all_modules } = useSelector(state => state.userDetails);

    return (
        <>
            <Route path="/" component={SideDrawerWithHeader} />
            {
                routes.map((route, index) => {
                    let accessProperties = "";
                    access_modules.map((module) => { if (module.id === route.id) accessProperties = module; return null; })
                    return <Route key={index} exact path={route.url} render={accessProperties.read ? () => route.component(accessProperties) : () => <AccessDenied />} />
                })
            }
        </>
    )
}
