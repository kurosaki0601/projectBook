import { Navigate, createBrowserRouter } from "react-router-dom";


import Login from "./Authentication/Login";
import ProtectedRoutes from "./utils/ProtectedRouter";


import Details from "./components/Details";
import Blog from "./components/Blog";
import CustomerInfor from "./components/CustomerInfor";

import Register from "./Authentication/Register";
import TabHome from "./components/TabHome";
import DetailBlog from "./components/DetailBlog";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/home",
    element: <TabHome />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/customers",
    
    children: [
    {
      path: "detail/:id",
      element: <Details />,
    },
    {
      path: "blog",
      element: <Blog />,
    },
    {
      path: "blog/:id",
      element: <DetailBlog />,
    },
    {
      path: "infor/:id",
      element: <ProtectedRoutes><CustomerInfor /></ProtectedRoutes>,
    },
    
    ],
  },
  

  
]);
export default Router;
