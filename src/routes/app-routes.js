import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import SideDrawerWithHeader from '../components/side-drawer';
import { User, RoleMgt, AccessDenied } from '../screens';
import { useSelector, useDispatch } from 'react-redux';
import { getUserRole } from '../api';
import { setAccess } from '../redux/actions/user';


export default () => {

    const routes = [
        { id: 1, component: (props) => <User access={props} />, url: "/users" },
        { id: 2, component: (props) => <RoleMgt access={props} />, url: "/role-management" }
    ]
    const dispatch = useDispatch()
    const { access_modules, all_modules, user } = useSelector(state => state.userDetails);

    useEffect(() => {
        let interval = setInterval(() => {
            getUserRole(user._id)
                .then((res) => dispatch(setAccess(res.roles.access_modules)))
                .catch((err) => console.log(err))
        }, 10000);
        return () => clearInterval(interval);
    }, [])

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
