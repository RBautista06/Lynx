import type { ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAuth, checkAuth } from "../../store/storeSlice/authSlice";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import type { AppDispatch } from "../../store/store";

interface Props {
  children: ReactNode;
}

const ProtectRoute = ({ children }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading } = useSelector(userAuth);

  useEffect(() => {
    if (!user) {
      dispatch(checkAuth());
    }
  }, [user, dispatch]);

  if (isLoading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectRoute;
