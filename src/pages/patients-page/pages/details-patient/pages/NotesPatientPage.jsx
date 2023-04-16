import { useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../../components/loader/Loader";
import {
  notesDispatcherContext,
  notesStateContext,
} from "../../../../../context/noteContext";
import useFetchData from "../../../../../hooks/useFetchData";
import useFetchPaginatedData from "../../../../../hooks/useFetchPaginatedData";
import noteReducer from "../../../../../reducers/noteReducer";
import NoteService from "../../../../../services/NoteService";
import PathService from "../../../../../services/PathService";
import PatientService from "../../../../../services/PatientService";
import buildFullName, {
  getRandomDoctorName,
} from "../../../../../utils/helpers";
import ErrorPage from "../../../../error-page/ErrorPage";
import NoteTile from "../components/NoteTile";

export default function NotesPatientPage() {
  const [state, dispatch] = useReducer(noteReducer, { data: [] });
  const [page, setPage] = useState(1);

  const { id } = useParams();

  const {
    isLoadingPatients,
    data: patient,
    error: errorPatient,
  } = useFetchData(id, PatientService, {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    sex: "",
  });

  if (errorPatient) return <ErrorPage />;

  let navigate = useNavigate();
  const goToDetailsPage = (id) => {
    navigate(
      PathService.detailsPatientPagePath.programaticPath(
        id,
        PathService.mode.add.value
      )
    );
  };

  const {
    isLoading: isLoadingNotes,
    data,
    error: errorNotes,
  } = useFetchPaginatedData(
    dispatch,
    state,
    (page) => NoteService.findByPatientId(id, page),
    page
  );

  if (errorNotes) return <ErrorPage />;

  const notes = data.map((note) => {
    return { ...note, doctor: getRandomDoctorName() };
  });

  const isLoading = isLoadingPatients || isLoadingNotes;

  return isLoading ? (
    <Loader />
  ) : (
    <notesStateContext.Provider value={notes}>
      <notesDispatcherContext.Provider value={dispatch}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">
                {`Notes (${notes.length}) - ${buildFullName(
                  patient.firstName,
                  patient.lastName
                )}`}
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
                onClick={() => goToDetailsPage(id)}
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
                          <NoteTile note={note} key={note.id} patientId={id} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex mt-5 justify-center">
                <button
                  type="button"
                  onClick={() => setPage(page + 1)}
                  className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Load more notes
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-8 text-base font-semibold leading-6 text-gray-900">
              No notes found
            </p>
          )}
        </div>
      </notesDispatcherContext.Provider>
    </notesStateContext.Provider>
  );
}
