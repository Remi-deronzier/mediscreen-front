import {
  CakeIcon,
  MapPinIcon,
  PencilSquareIcon,
  PhoneIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import manAvatar from "../../assets/images/avatar-man.png";
import womanAvatar from "../../assets/images/avatar-woman.png";
import Loader from "../../components/loader/Loader";

const sexTypes = {
  M: { label: "Homme", image: manAvatar },
  F: { label: "Femme", image: womanAvatar },
};

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let shouldCancel = false;
    async function fetchPatients() {
      try {
        const response = await fetch("http://localhost:8081/patients");
        if (response.ok) {
          const data = await response.json();
          if (shouldCancel) return;
          setPatients(data.content);
        } else {
          alert("Une erreur est survenue");
        }
      } catch (error) {
        alert("Une erreur est survenue");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPatients();
    return () => {
      shouldCancel = true;
    };
  }, []);

  const buildFullName = (firstName, lastName) => {
    return `${firstName} ${lastName.toUpperCase()}`;
  };

  const buildSex = (sex) => {
    return sexTypes[sex].label;
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <button
        type="button"
        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-5"
      >
        <PlusCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        Add a patient
      </button>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4"
      >
        {patients.map((patient) => (
          <li
            key={patient.id}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
          >
            <div className="flex w-full justify-between space-x-8 p-5">
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
                  <p className="mt-1 truncate text-sm">{patient.address}</p>
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
                <button className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 py-4 text-sm font-semibold text-gray-900">
                  <PencilSquareIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Edit
                </button>
                <button className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 py-4 text-sm font-semibold text-gray-900">
                  <TrashIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
