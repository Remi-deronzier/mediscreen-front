import {
  CakeIcon,
  MapPinIcon,
  PencilSquareIcon,
  PhoneIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../../../../components/buttons/LoadingButton";
import { useDispatchPatients } from "../../../../../context/patientContext";
import useDeleteData from "../../../../../hooks/useDeleteData";
import PathService from "../../../../../services/PathService";
import PatientService from "../../../../../services/PatientService";
import buildFullName, {
  buildSexAvatar,
  buildSexLabel,
} from "../../../../../utils/helpers";

export default function PatientCard({ patient }) {
  const dispatch = useDispatchPatients();
  const { isLoading, deleteData } = useDeleteData(dispatch, PatientService);

  let navigate = useNavigate();
  const goToEditPage = (id) => {
    navigate(PathService.editPatientPagePath.programaticPath(id));
  };

  const goToDetailsPage = (id) => {
    navigate(
      PathService.detailsPatientPagePath.programaticPath(
        id,
        PathService.mode.add.value
      )
    );
  };

  return (
    <li
      key={patient.id}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div
        className="flex w-full justify-between space-x-8 p-5 hover:cursor-pointer"
        onClick={() => goToDetailsPage(patient.id)}
      >
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3 pb-2">
            <h3 className="truncate text-sm font-medium text-gray-900">
              {buildFullName(patient.firstName, patient.lastName)}
            </h3>
            <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              {buildSexLabel(patient.sex)}
            </span>
          </div>
          <div className="flex items-center gap-x-2 text-gray-500">
            <CakeIcon className="h-4 w-4" aria-hidden="true" />
            <p className="mt-1 truncate text-sm">{patient.dateOfBirth}</p>
          </div>
          <div className="flex items-center gap-x-2 text-gray-500">
            <MapPinIcon className="h-4 w-4" aria-hidden="true" />
            <p className="mt-1 truncate text-sm">
              {patient.address.slice(0, 30)}
            </p>
          </div>
          <div className="flex items-center gap-x-2 text-gray-500">
            <PhoneIcon className="h-4 w-4" aria-hidden="true" />
            <p className="mt-1 truncate text-sm">{patient.phoneNumber}</p>
          </div>
        </div>
        <img
          className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
          src={buildSexAvatar(patient.sex)}
          alt=""
        />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <LoadingButton
            className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center gap-x-3 py-4 text-sm font-semibold text-gray-900"
            isLoading={isLoading}
            label="Edit"
            onClick={(e) => {
              e.stopPropagation();
              goToEditPage(patient.id);
            }}
          >
            <PencilSquareIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </LoadingButton>
          <LoadingButton
            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 py-4 text-sm font-semibold text-gray-900"
            isLoading={isLoading}
            label="Delete"
            onClick={(e) => {
              e.stopPropagation();
              deleteData(patient.id);
            }}
          >
            <TrashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </LoadingButton>
        </div>
      </div>
    </li>
  );
}
