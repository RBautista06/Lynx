// routes/ProtectRoute.tsx
import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userAuth } from "../../store/storeSlice/authSlice";

interface Props {
  children: ReactNode;
}

const ProtectRoute = ({ children }: Props) => {
  const { user, checked } = useSelector(userAuth);

  if (!checked) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p className="text-lg font-semibold">Checking auth...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectRoute;
