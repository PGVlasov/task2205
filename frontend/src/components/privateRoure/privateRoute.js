import { useSelector } from 'react-redux'
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const { isAuth } = useSelector((state) => state.authReducer)
  return isAuth
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}
export default ProtectedRoutes
