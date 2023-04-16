import { useEffect, useState } from "react";
import { SET_DATA } from "../constants/actionTypes";

export default function useFetchPaginatedData(dispatch, state, request, page) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let shouldCancel = false;
    async function fetchData() {
      try {
        const response = await request(page);
        if (response.ok) {
          const newData = await response.json();
          if (shouldCancel) return;
          dispatch({
            type: SET_DATA,
            data: [...state.data, ...newData.content],
          });
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
  }, [page]);

  return { isLoading, data: state.data, error };
}
