import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/loader/Loader";
import { ApiContext } from "../../../../context/apiContext";
import useFetchPatient from "../../../../hooks/useFetchPatient";
import buildFullName from "../../../../utils/helpers";
import NoteArea from "./components/NoteArea";

export default function DetailsPatient() {
  const { BASE_URL_PATIENTS_SERVICE, BASE_URL_REPORTS_SERVICE } =
    useContext(ApiContext);
  const { id } = useParams();
  const { isLoading, patient } = useFetchPatient(
    `${BASE_URL_PATIENTS_SERVICE}/patients/${id}`
  );

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

  const downloadPdf = async () => {
    const response = await fetch(
      `${BASE_URL_REPORTS_SERVICE}/reports/pdf?patientId=${id}`
    );
    const base64Data = await response.text();
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${base64Data}`;
    link.download = buildPdfName(patient);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <NoteArea patientId={patient.id} />
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
                    <button
                      onClick={downloadPdf}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Download
                    </button>
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
