import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Match from "./pages/Match";
import { Provider } from "react-redux";
import store from "./store";
// import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/user", element: <Dashboard /> },
  { path: "/match", element: <Match /> },
]);

const App = () => {
  return (
    <>
      <Provider store={store}>
        {/* <ErrorBoundary> */}
        <RouterProvider router={router} />
        {/* </ErrorBoundary> */}
      </Provider>
    </>
  );
};

export default App;
