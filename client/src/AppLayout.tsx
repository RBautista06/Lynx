import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, userAuth } from "./store/storeSlice/authSlice";
import type { AppDispatch } from "./store/store";

const AppLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, checked } = useSelector(userAuth);

  useEffect(() => {
    if (!checked) {
      dispatch(checkAuth());
    }
  }, [checked, dispatch]);

  if (!checked) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return <Outlet />;
};

export default AppLayout;
