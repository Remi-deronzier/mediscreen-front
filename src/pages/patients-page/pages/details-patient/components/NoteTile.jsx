import { useNavigate } from "react-router-dom";
import LoadingButton from "../../../../../components/buttons/LoadingButton";
import { useDispatchNotes } from "../../../../../context/noteContext";
import useDeleteData from "../../../../../hooks/useDeleteData";
import NoteService from "../../../../../services/NoteService";
import PathService from "../../../../../services/PathService";

export default function NoteTile({ note, patientId }) {
  const dispatch = useDispatchNotes();

  const { isLoading, deleteData } = useDeleteData(dispatch, NoteService);

  const navigate = useNavigate();
  const goToEditPage = (noteId) => {
    navigate(
      PathService.detailsPatientPagePath.programaticPath(
        patientId,
        PathService.mode.edit.value,
        noteId
      )
    );
  };

  return (
    <tr key={note.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {note.doctor}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {note.createdAt.split("T")[0] +
          " " +
          note.createdAt.split("T")[1].split(".")[0]}
      </td>
      <td className=" px-3 py-4 text-sm text-gray-500">
        <p>{note.content}</p>
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToEditPage(note.id);
          }}
          className="text-indigo-600 hover:text-indigo-900"
        >
          Edit
        </button>
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <LoadingButton
          isLoading={isLoading}
          onClick={(e) => {
            e.stopPropagation();
            deleteData(note.id);
          }}
          className="text-indigo-600 hover:text-indigo-900"
          label="Delete"
        />
      </td>
    </tr>
  );
}
