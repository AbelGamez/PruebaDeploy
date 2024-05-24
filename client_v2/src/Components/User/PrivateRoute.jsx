import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import NotFound from '../General/404/404'
import Login from './logIn'
const PrivateRoute = ({ element: Element, ...rest }) => {
    const { user } = React.useContext(AuthContext);
    return (
        // Si no esta logueado y el usuario es admin redirecciona a /login
        user && user.admin ? <Element {...rest} /> : <NotFound/> 
    );
};

const PrivateRouteUser = ({ element: Element, ...rest }) => {
    const { user } = React.useContext(AuthContext);
    return (
        // Si no esta logueado y el usuario es admin redirecciona a /login
        user ? <Element {...rest} /> : <Login/> 
    );
};

export {PrivateRoute,PrivateRouteUser} ;
