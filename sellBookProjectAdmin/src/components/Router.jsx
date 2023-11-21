import { Navigate, createBrowserRouter } from "react-router-dom";
import Customer from "./Admin/Customer";
import Blog from "./Admin/Blog";
import OrderManager from "./Admin/OrderManager";
import Book from "./Admin/Book";
import Login from "./Authentication/Login";
import ProtectedRoutes from "../utils/ProtectedRouter";
import Category from "./Admin/Category";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    
    children: [{
      path: "customers",
      element: <ProtectedRoutes><Customer /></ProtectedRoutes>,
    },
    {
      path: "blog",
      element: <ProtectedRoutes><Blog /></ProtectedRoutes>,
    },
    {
      path: "book",
      element: <ProtectedRoutes><Book /></ProtectedRoutes>,
    },
    {
      path: "category",
      element: <ProtectedRoutes><Category /></ProtectedRoutes>,
    },
    {
      path: "order",
      element: <ProtectedRoutes><OrderManager /></ProtectedRoutes>,
    },],
  },
  

  
]);
export default Router;
