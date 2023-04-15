import { useState } from "react";
import { DELETE_DATA } from "../constants/actionTypes";

export default function useDeleteData(dispatch, service) {
  const [isLoading, setIsLoading] = useState(false);

  async function deleteData(id) {
    try {
      setIsLoading(true);
      await service.remove(id);
      dispatch({ type: DELETE_DATA, id });
    } catch (error) {
      alert("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, deleteData };
}
