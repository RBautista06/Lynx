import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, userAuth } from "./store/storeSlice/authSlice";
import type { AppDispatch } from "./store/store";
import { Loader2 } from "lucide-react";

const AppLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { checked } = useSelector(userAuth);

  useEffect(() => {
    if (!checked) {
      dispatch(checkAuth());
    }
  }, [checked, dispatch]);

  if (!checked) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p className="text-lg font-semibold">
          <Loader2 className="animate-spin size-10 mr-2" />
        </p>
      </div>
    );
  }

  return <Outlet />;
};

export default AppLayout;
