import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/error-page/ErrorPage";
import HomePage from "./pages/home-page/HomePage";
import PatientsLayout from "./pages/patients-page/PatientsLayout";
import AddPatientPage from "./pages/patients-page/pages/add-patient/AddPatientPage";
import EditPatientPage from "./pages/patients-page/pages/edit-patient/EditPatient";
import PatientsPage from "./pages/patients-page/pages/patients/PatientsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/patients",
        element: <PatientsLayout />,
        children: [
          {
            index: true,
            element: <PatientsPage />,
          },
          {
            path: "add",
            element: <AddPatientPage />,
          },
          {
            path: "edit/:id",
            element: <EditPatientPage />,
          },
        ],
      },
    ],
  },
]);
