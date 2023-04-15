import {
  CakeIcon,
  MapPinIcon,
  PencilSquareIcon,
  PhoneIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import manAvatar from "../../../../../assets/images/avatar-man.png";
import womanAvatar from "../../../../../assets/images/avatar-woman.png";
import Loader from "../../../../../components/loader/Loader";
import { DELETE_DATA } from "../../../../../constants/actionTypes";
import { ApiContext } from "../../../../../context/apiContext";
import { useDispatchPatients } from "../../../../../context/patientContext";
import buildFullName from "../../../../../utils/helpers";

const sexTypes = {
  M: { label: "Homme", image: manAvatar },
  F: { label: "Femme", image: womanAvatar },
};

export default function PatientCard({ patient }) {
  const { BASE_URL_PATIENTS_SERVICE } = useContext(ApiContext);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatchPatients();

  let navigate = useNavigate();
  const goToEditPage = (id) => {
    let path = `/patients/edit/${id}`;
    navigate(path);
  };

  const goToDetailsPage = (id) => {
    let path = `/patients/${id}`;
    navigate(path);
  };

  const buildSex = (sex) => {
    return sexTypes[sex].label;
  };

  const handleDeletePatient = async (id) => {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL_PATIENTS_SERVICE}/patients/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: DELETE_DATA, id });
    } catch (error) {
      alert("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
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
              {buildSex(patient.sex)}
            </span>
          </div>
          <div className="flex items-center gap-x-2 text-gray-500">
            <CakeIcon className="h-4 w-4" aria-hidden="true" />
            <p className="mt-1 truncate text-sm">{patient.dateOfBirth}</p>
          </div>
          <div className="flex items-center gap-x-2 text-gray-500">
            <MapPinIcon className="h-4 w-4" aria-hidden="true" />
            <p className="mt-1 truncate text-sm">
              {patient.address.slice(0, 25)}
            </p>
          </div>
          <div className="flex items-center gap-x-2 text-gray-500">
            <PhoneIcon className="h-4 w-4" aria-hidden="true" />
            <p className="mt-1 truncate text-sm">{patient.phoneNumber}</p>
          </div>
        </div>
        <img
          className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
          src={sexTypes[patient.sex].image}
          alt=""
        />
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          {isLoading ? (
            <div className="flex-auto p-2">
              <Loader />
            </div>
          ) : (
            <button
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 py-4 text-sm font-semibold text-gray-900"
              disabled={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                goToEditPage(patient.id);
              }}
            >
              <PencilSquareIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Edit
            </button>
          )}
          {isLoading ? (
            <div className="flex-auto p-2">
              <Loader />
            </div>
          ) : (
            <button
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 py-4 text-sm font-semibold text-gray-900"
              disabled={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                handleDeletePatient(patient.id);
              }}
            >
              <TrashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              Delete
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
