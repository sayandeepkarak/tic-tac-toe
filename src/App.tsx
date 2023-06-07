import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Match from "./pages/Match";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/user", element: <Dashboard /> },
  { path: "/match", element: <Match /> },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
