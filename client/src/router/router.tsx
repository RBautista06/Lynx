import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import AuthRoute from "../component/routeGuard/AuthRoute";
import ProtectRoute from "../component/routeGuard/ProtectRoute";
import ProfilePage from "../pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute>
        <Homepage />
      </ProtectRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthRoute>
        <LoginPage />
      </AuthRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthRoute>
        <SignupPage />
      </AuthRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectRoute>
        <ProfilePage />
      </ProtectRoute>
    ),
  },
]);

export default router;
