import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Match from "./pages/Match";
import { Provider } from "react-redux";
import store from "./store";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/user", element: <Dashboard /> },
  { path: "/match", element: <Match /> },
]);

const App = () => {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
};

export default App;
