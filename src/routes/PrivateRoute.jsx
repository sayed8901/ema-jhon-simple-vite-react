import React, { useContext } from 'react';
import { AuthContext } from '../contextProviders/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);

    const location = useLocation();
    // console.log(location);

    if(loading){
        return 'loading...';
    }

    if(user){
        return children;
    }
    else{
        return <Navigate to={'/login'} state={{from: location}} replace>Login</Navigate>;
    }
};

export default PrivateRoute;