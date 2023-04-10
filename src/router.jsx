import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/home-page/HomePage";
import PatientsPage from "./pages/patients-page/PatientsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/patients",
        element: <PatientsPage />,
      },
    ],
  },
]);
