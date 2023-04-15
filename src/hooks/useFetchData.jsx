import { useEffect, useState } from "react";
import { SET_DATA } from "../constants/actionTypes";

export default function useFetchData(dispatch, state, request) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let shouldCancel = false;
    async function fetchData() {
      try {
        const response = await request();
        if (response.ok) {
          const data = await response.json();
          if (shouldCancel) return;
          dispatch({ type: SET_DATA, data: data.content });
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
    fetchData();
    return () => {
      shouldCancel = true;
    };
  }, []);

  return { isLoading, data: state.data, error };
}
