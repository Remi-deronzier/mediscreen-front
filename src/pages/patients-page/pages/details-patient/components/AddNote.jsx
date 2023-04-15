import NoteService from "../../../../../services/NoteService";
import NoteAreaLayout from "./layout/NoteAreaLayout";

export default function AddNote({ patientId }) {
  const defaultValues = { note: "" };

  async function submit(payload) {
    try {
      await NoteService.create(payload);
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <NoteAreaLayout
      patientId={patientId}
      defaultValues={defaultValues}
      submit={submit}
    />
  );
}
