import { useEffect, useState } from "react";

export default function useFetchData(id, service, defaultData) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    let shouldCancel = false;
    async function fetchData() {
      try {
        const response = await service.get(id);
        if (response.ok) {
          const data = await response.json();
          if (shouldCancel) return;
          setData(data);
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

  return { isLoading, data, error };
}
