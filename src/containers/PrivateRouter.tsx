import { useAppSelector } from "hooks/redux";
import { FunctionComponent, ReactNode } from "react";
import { Navigate, Route } from "react-router-dom";
import { RoutePaths } from "./AppRouter";

type PrivateRouteProps = {
  children: ReactNode
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ children }) => {

  const token = useAppSelector(state => state.auth.userToken)

  return token ? children : <Navigate to={RoutePaths.LOGIN} />
}

export default PrivateRoute;
