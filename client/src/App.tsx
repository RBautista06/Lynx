import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
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
    <Provider store={store}>
      <div className="flex items-center justify-center">
        <div className="h-screen w-full">
          <RouterProvider router={router} />
        </div>
      </div>
    </Provider>
  );
};

export default App;
