import { createRoot } from "react-dom/client";
import App from "./App";
import Auth from "./components/Auth";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import Info from "./components/Info";
import API from "./services/api";
import InfoDetail from "./components/InfoDetail";
import { Provider } from "react-redux";
import { store } from "./services/store/store";
import './normalize.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Info />,
  },
  {
    path: "/:id",
    element: <InfoDetail />,
  },
  {
    path: "login",
    element: <Auth />,
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);

API.init();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
