import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { ApiContext } from "../../context/apiContext";
import useFetchPatients from "../../hooks/useFetchPatients";
import PatientCard from "./components/PatientCard";

export default function PatientsPage() {
  const BASE_URL_API = useContext(ApiContext);

  const { isLoading, patients } = useFetchPatients(`${BASE_URL_API}/patients`);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/add-patient";
    navigate(path);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <button
        type="button"
        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-5"
        onClick={routeChange}
      >
        <PlusCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Add a patient
      </button>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4"
      >
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </ul>
    </div>
  );
}
