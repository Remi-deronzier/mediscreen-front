import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./assets/styles/index.css";
import { ApiContext } from "./context/apiContext";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiContext.Provider value="http://localhost:8081">
      <RouterProvider router={router} />
    </ApiContext.Provider>
  </React.StrictMode>
);
