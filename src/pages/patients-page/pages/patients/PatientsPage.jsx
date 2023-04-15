import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/loader/Loader";
import {
  useDispatchPatients,
  usePatients,
} from "../../../../context/patientContext";
import useFetchData from "../../../../hooks/useFetchData";
import PathService from "../../../../services/PathService";
import PatientService from "../../../../services/PatientService";
import ErrorPage from "../../../error-page/ErrorPage";
import PatientCard from "./components/PatientCard";

export default function PatientsPage() {
  const state = usePatients();
  const dispatch = useDispatchPatients();

  const {
    isLoading,
    data: patients,
    error,
  } = useFetchData(dispatch, state, PatientService.getAll);

  let navigate = useNavigate();
  const goToAddPatientPage = () => {
    navigate(PathService.addPatientPagePath.absolutePath);
  };

  if (error) return <ErrorPage />;

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <button
        type="button"
        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-5"
        onClick={goToAddPatientPage}
      >
        <PlusCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Add a patient
      </button>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4"
      >
        {patients.length > 0 ? (
          patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))
        ) : (
          <div>
            <p className="text-2xl font-semibold leading-6 text-gray-900">
              No patients found
            </p>
            <p className="text-sm pt-2">Add a patient to get started</p>
          </div>
        )}
      </ul>
    </div>
  );
}
