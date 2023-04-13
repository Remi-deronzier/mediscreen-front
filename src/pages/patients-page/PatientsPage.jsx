import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { SET_PATIENTS } from "../../constants/actionTypes";
import { useDispatchPatients, usePatients } from "../../context/patientContext";
import PatientCard from "./components/PatientCard";

export default function PatientsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const state = usePatients();
  const dispatch = useDispatchPatients();

  useEffect(() => {
    let shouldCancel = false;
    async function fetchPatients() {
      try {
        const response = await fetch("http://localhost:8081/patients");
        if (response.ok) {
          const data = await response.json();
          if (shouldCancel) return;
          dispatch({ type: SET_PATIENTS, patients: data.content });
        } else {
          alert("Une erreur est survenue");
        }
      } catch (error) {
        alert("Une erreur est survenue");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPatients();
    return () => {
      shouldCancel = true;
    };
  }, []);

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
        {state.patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </ul>
    </div>
  );
}
