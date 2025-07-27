import { useEffect, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, userAuth } from "../../store/storeSlice/authSlice";
import { Navigate } from "react-router-dom";
import type { AppDispatch } from "../../store/store";

interface Props {
  children: ReactNode;
}

const AuthRoute = ({ children }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading } = useSelector(userAuth);

  useEffect(() => {
    if (!user) {
      dispatch(checkAuth());
    }
  }, [dispatch, user]);

  if (isLoading) return null; // or a loading spinner

  if (user) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default AuthRoute;
