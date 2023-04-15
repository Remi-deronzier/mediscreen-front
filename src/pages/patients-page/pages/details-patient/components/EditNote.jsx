import { useSearchParams } from "react-router-dom";
import Loader from "../../../../../components/loader/Loader";
import useFetchData from "../../../../../hooks/useFetchData";
import ErrorPage from "../../../../../pages/error-page/ErrorPage";
import NoteService from "../../../../../services/NoteService";
import NoteAreaLayout from "./layout/NoteAreaLayout";

export default function EditNote({ patientId }) {
  const [queryParams] = useSearchParams();
  const noteId = queryParams.get("noteId");

  const {
    isLoading,
    data: note,
    error,
  } = useFetchData(noteId, NoteService, { content: "" });

  if (error) return <ErrorPage />;

  const defaultValues = {
    patientId,
    content: note.content,
  };

  async function submit(payload) {
    try {
      if (JSON.stringify(defaultValues) === JSON.stringify(payload))
        throw new Error("No changes detected, please update the form");
      await NoteService.update(noteId, payload);
    } catch (error) {
      throw new Error(error);
    }
  }

  return isLoading ? (
    <Loader />
  ) : (
    <NoteAreaLayout
      patientId={patientId}
      defaultValues={defaultValues}
      submit={submit}
    />
  );
}
