import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

const App = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="border h-screen w-6xl">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
