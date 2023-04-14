import { useEffect, useState } from "react";

export default function useFetchPatient(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patient, setPatient] = useState({});

  useEffect(() => {
    let shouldCancel = false;
    async function fetchPatient() {
      try {
        const response = await fetch(url);
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
