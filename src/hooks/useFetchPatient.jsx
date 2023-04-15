import { useEffect, useState } from "react";
import { BASE_URL_PATIENTS_SERVICE } from "../constants/api";

export default function useFetchPatient(id) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    sex: "",
  });

  useEffect(() => {
    let shouldCancel = false;
    async function fetchPatient() {
      try {
        const response = await fetch(
          `${BASE_URL_PATIENTS_SERVICE}/patients/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          if (shouldCancel) return;
          setPatient(data);
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
    fetchPatient();
    return () => {
      shouldCancel = true;
    };
  }, []);

  return { isLoading, patient, error };
}
