import "./router.css";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "components/Header";
import Home from "./pages/home";
import Posts from "./pages/posts";
import Post from "./pages/post";
import About from "./pages/about";
import Footer from "components/Footer";

const AppLayout = () => (
  <>
    <Header />
    <div className="content-container">
      <Outlet />
    </div>
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/posts", element: <Posts /> },
      { path: "posts/:id", element: <Post /> },
      { path: "/about", element: <About /> },
    ],
  },
]);

export default router;
