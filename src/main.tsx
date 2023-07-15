/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { setUser } from "./redux/features/user/userSlice.ts";

const user = localStorage.getItem("user");

store.dispatch(setUser(user));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
