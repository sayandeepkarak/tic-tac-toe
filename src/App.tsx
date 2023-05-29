import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";

const router = createBrowserRouter([{ path: "/", element: <Home /> }]);

const App = () => {
  return (
    <>
      <Header />
      <main>
        <RouterProvider router={router} />
      </main>
    </>
  );
};

export default App;
