import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/error-page/ErrorPage";
import HomePage from "./pages/home-page/HomePage";
import PatientsPageLayout from "./pages/patients-page/PatientsPageLayout";
import AddPatientPage from "./pages/patients-page/pages/add-patient/AddPatientPage";
import DetailsPatientLayout from "./pages/patients-page/pages/details-patient/DetailsPatientLayout";
import DetailsPatientPage from "./pages/patients-page/pages/details-patient/pages/DetailsPatientPage";
import NotesPatientPage from "./pages/patients-page/pages/details-patient/pages/NotesPatientPage";
import EditPatientPage from "./pages/patients-page/pages/edit-patient/EditPatient";
import PatientsPage from "./pages/patients-page/pages/patients/PatientsPage";
import PathService from "./services/PathService";

export const router = createBrowserRouter([
  {
    path: PathService.homePagePath.absolutePath,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PathService.patientsPagePath.absolutePath,
        element: <PatientsPageLayout />,
        children: [
          {
            index: true,
            element: <PatientsPage />,
          },
          {
            path: PathService.addPatientPagePath.relativePath,
            element: <AddPatientPage />,
          },
          {
            path: PathService.editPatientPagePath.relativePath,
            element: <EditPatientPage />,
          },
          {
            path: PathService.detailsPatientPagePath.relativePath,
            element: <DetailsPatientLayout />,
            children: [
              {
                index: true,
                element: <DetailsPatientPage />,
              },
              {
                path: PathService.notesPatientPagePath.relativePath,
                element: <NotesPatientPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
