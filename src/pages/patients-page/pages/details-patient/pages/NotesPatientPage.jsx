import { useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../../../components/loader/Loader";
import { ApiContext } from "../../../../../context/apiContext";
import { useDispatchNotes, useNotes } from "../../../../../context/noteContext";
import useFetchData from "../../../../../hooks/useFetchData";
import useFetchPatient from "../../../../../hooks/useFetchPatient";
import buildFullName, {
  getRandomDoctorName,
} from "../../../../../utils/helpers";

export default function NotesPatientPage() {
  const { BASE_URL_NOTES_SERVICE } = useContext(ApiContext);
  const { id } = useParams();
  const state = useNotes();
  const dispatch = useDispatchNotes();

  const { isLoadingPatients, patient } = useFetchPatient(id);
  const { isLoading: isLoadingNotes, data } = useFetchData(
    `${BASE_URL_NOTES_SERVICE}/notes/patient/${id}`,
    dispatch,
    state
  );

  const notes = data.map((note) => {
    return { ...note, doctor: getRandomDoctorName() };
  });

  const isLoading = isLoadingPatients || isLoadingNotes;

  return isLoading ? (
    <Loader />
  ) : (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {`Notes - ${buildFullName(patient.firstName, patient.lastName)}`}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {`A list of all the notes of the patient ${buildFullName(
              patient.firstName,
              patient.lastName
            )}`}
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add note
          </button>
        </div>
      </div>
      {notes.length > 0 ? (
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Doctor
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Content
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {notes.map((note) => (
                      <tr key={note.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {note.doctor}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {note.createdAt.split("T")[0] +
                            " " +
                            note.createdAt.split("T")[1]}
                        </td>
                        <td className=" px-3 py-4 text-sm text-gray-500">
                          <p>{note.content}</p>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit<span className="sr-only">, {note.name}</span>
                          </a>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Delete<span className="sr-only">, {note.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-8 text-base font-semibold leading-6 text-gray-900">
          No notes found
        </p>
      )}
    </div>
  );
}
