import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import SearchPage from "./SearchPage";


const root = createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    // loader: {},
    // action: {},
    // errorElement: {},
    children: [
      {
        path: 'search/',
        element: <SearchPage/>,
        // loader:
      },
    ]
  }
]);


root.render(
  <RouterProvider router={router}/>
)