import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import AllBooks from "../pages/AllBooks";
import AddNewBook from "../pages/AddNewBook";
import PrivateRoute from "./PrivateRoute";
import BookDetails from "../pages/BookDetails";
import EditeBook from "../pages/EditeBook";
import Wishlist from "../pages/Wishlist";
import ReadingList from "../pages/ReadingList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/allbooks",
        element: <AllBooks />,
      },
      {
        path: "/book/:id",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/readlist",
        element: (
          <PrivateRoute>
            <ReadingList />
          </PrivateRoute>
        ),
      },
      {
        path: "/editbook/:id",
        element: (
          <PrivateRoute>
            <EditeBook />
          </PrivateRoute>
        ),
      },

      {
        path: "/addnew",
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
