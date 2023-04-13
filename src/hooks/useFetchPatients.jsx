import { useEffect, useState } from "react";
import { SET_PATIENTS } from "../constants/actionTypes";
import { useDispatchPatients, usePatients } from "../context/patientContext";

export default function useFetchPatients(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const state = usePatients();
  const dispatch = useDispatchPatients();

  useEffect(() => {
    let shouldCancel = false;
    async function fetchPatients() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          if (shouldCancel) return;
          dispatch({ type: SET_PATIENTS, patients: data.content });
        } else {
          alert("Une erreur est survenue");
        }
      } catch (error) {
        setError(error);
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

  return { isLoading, patients: state.patients, error };
}
