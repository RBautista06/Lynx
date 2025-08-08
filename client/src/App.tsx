import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import router from "./router/router";
import { Toaster } from "sonner";

const App = () => {
  return (
    <Provider store={store}>
      <div className="flex items-center justify-center ">
        <div className="h-screen w-full">
          <RouterProvider router={router} />
          <Toaster richColors position="top-center" />
        </div>
      </div>
    </Provider>
  );
};

export default App;
