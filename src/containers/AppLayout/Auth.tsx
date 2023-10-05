import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { logOut } from "store/slices/authSlice";

const AuthVerify = () => {

  const location = useLocation();
  const dispatch = useDispatch()

  useEffect(() => {
    const token = parseJwt(localStorage.getItem('token'))
      if (+token?.exp * 1000 < +Date.now()) dispatch(logOut())
  }, [location]);

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  return <div></div>;
};

export default AuthVerify