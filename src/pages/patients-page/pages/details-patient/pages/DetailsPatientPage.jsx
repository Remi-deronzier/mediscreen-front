import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingButton from "../../../../../components/buttons/LoadingButton";
import Loader from "../../../../../components/loader/Loader";
import useFetchData from "../../../../../hooks/useFetchData";
import ErrorPage from "../../../../../pages/error-page/ErrorPage";
import PathService from "../../../../../services/PathService";
import PatientService from "../../../../../services/PatientService";
import ReportService from "../../../../../services/ReportService";
import buildFullName from "../../../../../utils/helpers";
import AddNote from "../components/AddNote";

export default function DetailsPatientPage() {
  const { id } = useParams();
  const {
    isLoading,
    data: patient,
    error,
  } = useFetchData(id, PatientService, {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    sex: "",
  });
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  if (error) return <ErrorPage />;

  function toAsciiString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function buildPdfName(patient) {
    return `report_${toAsciiString(
      patient.firstName
    ).toLowerCase()}_${toAsciiString(
      patient.lastName
    ).toLowerCase()}_${new Date().toLocaleDateString()}.pdf`;
  }

  let navigate = useNavigate();
  const goToNotesPatientPage = (id) => {
    navigate(PathService.notesPatientPagePath.programaticPath(id));
  };

  const downloadPdf = async () => {
    setIsDownloadingPdf(true);
    const response = await ReportService.downloadPdf(id);
    const base64Data = await response.text();
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${base64Data}`;
    link.download = buildPdfName(patient);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloadingPdf(false);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg xl:w-screen">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Patient Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Patient personal details.
        </p>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {buildFullName(patient?.firstName, patient?.lastName)}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Date of birth</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {patient.dateOfBirth}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {patient.address}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Phone number</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {patient.phoneNumber}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Note</dt>
            <dd className="flex items-start mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <button
                onClick={() => goToNotesPatientPage(patient.id)}
                className="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 mr-8"
              >
                See all notes
              </button>
              <AddNote patientId={patient.id} />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Report
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">report.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <LoadingButton
                      isLoading={isDownloadingPdf}
                      label="Download"
                      onClick={downloadPdf}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    />
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
