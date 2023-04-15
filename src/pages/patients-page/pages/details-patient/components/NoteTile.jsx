import Loader from "../../../../../components/loader/Loader";
import { useDispatchNotes } from "../../../../../context/noteContext";
import useDeleteData from "../../../../../hooks/useDeleteData";
import NoteService from "../../../../../services/NoteService";

export default function NoteTile({ note }) {
  const dispatch = useDispatchNotes();

  const { isLoading, deleteData } = useDeleteData(dispatch, NoteService);

  return (
    <tr key={note.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        {note.doctor}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {note.createdAt.split("T")[0] + " " + note.createdAt.split("T")[1]}
      </td>
      <td className=" px-3 py-4 text-sm text-gray-500">
        <p>{note.content}</p>
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <button className="text-indigo-600 hover:text-indigo-900">
          Edit<span className="sr-only">, {note.name}</span>
        </button>
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        {isLoading ? (
          <Loader />
        ) : (
          <button
            disabled={isLoading}
            onClick={(e) => {
              e.stopPropagation();
              deleteData(note.id);
            }}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Delete
            <span className="sr-only">, {note.name}</span>
          </button>
        )}
      </td>
    </tr>
  );
}
