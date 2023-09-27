import React, {FC} from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {pages} from "../../menu";
import {isAuthenticated} from "../../services/auth";

interface IHeaderLeftProps {
    component: any;
}
const PrivateRoute:FC<IHeaderLeftProps> = ({ component }) => {
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to={`../${pages.login.path}`} state={{ from: location }} replace/>;
    }

    return component;
}

PrivateRoute.propTypes = {
    component: PropTypes.element.isRequired,
};

export default PrivateRoute;