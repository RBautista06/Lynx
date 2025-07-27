import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import type { AppDispatch } from "./store/store";
import { useEffect } from "react";
import { checkAuth } from "./store/storeSlice/authSlice";

const AppLayout = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className="h-screen w-full">
      <Outlet />
    </div>
  );
};

export default AppLayout;
