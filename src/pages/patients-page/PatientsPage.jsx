import {
  CakeIcon,
  MapPinIcon,
  PencilSquareIcon,
  PhoneIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import manAvatar from "../../assets/images/avatar-man.png";
import womanAvatar from "../../assets/images/avatar-woman.png";

const people = [
  {
    id: 1,
    name: "Jane Cooper",
    dateOfBirth: "23/03/1998",
    sex: "Homme",
    address: "47, street NYC",
    telephone: "+1-202-555-0170",
  },
  {
    id: 2,
    name: "Jane Cooper",
    dateOfBirth: "23/03/1998",
    sex: "Homme",
    address: "47, street NYC",
    telephone: "+1-202-555-0170",
  },
  {
    id: 3,
    name: "Jane Cooper",
    dateOfBirth: "23/03/1998",
    sex: "Homme",
    address: "47, street NYC",
    telephone: "+1-202-555-0170",
  },
  {
    id: 4,
    name: "Jane Cooper",
    dateOfBirth: "23/03/1998",
    sex: "Femme",
    address: "47, street NYC",
    telephone: "+1-202-555-0170",
  },
  {
    id: 5,
    name: "Jane Cooper",
    dateOfBirth: "23/03/1998",
    sex: "Femme",
    address: "47, street NYC",
    telephone: "+1-202-555-0170",
  },
  {
    id: 6,
    name: "Jane Cooper",
    dateOfBirth: "23/03/1998",
    sex: "Femme",
    address: "47, street NYC",
    telephone: "+1-202-555-0170",
  },
  {
    id: 6,
    name: "Jane Cooper",
    dateOfBirth: "23/03/1998",
    sex: "Femme",
    address: "47, street NYC",
    telephone: "+1-202-555-0170",
  },
  {
    id: 7,
    name: "Jane Cooper",
    dateOfBirth: "23/03/1998",
    sex: "Femme",
    address: "47, street NYC",
    telephone: "+1-202-555-0170",
  },
  {
    id: 8,
    name: "Jane Cooper",
    dateOfBirth: "23/03/1998",
    sex: "Femme",
    address: "47, street NYC",
    telephone: "+1-202-555-0170",
  },
  {
    id: 9,
    name: "Jane Cooper",
    dateOfBirth: "23/03/1998",
    sex: "Femme",
    address: "47, street NYC",
    telephone: "+1-202-555-0170",
  },
  {
    id: 10,
    name: "Jane Cooper",
    dateOfBirth: "23/03/1998",
    sex: "Femme",
    address: "47, street NYC",
    telephone: "+1-202-555-0170",
  },
  {
    id: 10,
    name: "Jane Cooper",
    dateOfBirth: "23/03/1998",
    sex: "Femme",
    address: "47, street NYC",
    telephone: "+1-202-555-0170",
  },
  {
    id: 11,
    name: "Jane Cooper",
    dateOfBirth: "23/03/1998",
    sex: "Femme",
    address: "47, street NYC",
    telephone: "+1-202-555-0170",
  },
  {
    id: 12,
    name: "Jane Cooper",
    dateOfBirth: "23/03/1998",
    sex: "Femme",
    address: "47, street NYC",
    telephone: "+1-202-555-0170",
  },
];
export default function PatientsPage() {
  return (
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
        {people.map((person) => (
          <li
            key={person.id}
            className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
          >
            <div className="flex w-full justify-between space-x-8 p-5">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3 pb-2">
                  <h3 className="truncate text-sm font-medium text-gray-900">
                    {person.name}
                  </h3>
                  <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    {person.sex}
                  </span>
                </div>
                <div className="flex items-center gap-x-2 text-gray-500">
                  <CakeIcon className="h-4 w-4" aria-hidden="true" />
                  <p className="mt-1 truncate text-sm">{person.dateOfBirth}</p>
                </div>
                <div className="flex items-center gap-x-2 text-gray-500">
                  <MapPinIcon className="h-4 w-4" aria-hidden="true" />
                  <p className="mt-1 truncate text-sm">{person.address}</p>
                </div>
                <div className="flex items-center gap-x-2 text-gray-500">
                  <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                  <p className="mt-1 truncate text-sm">{person.telephone}</p>
                </div>
              </div>
              <img
                className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
                src={person.sex === "Homme" ? manAvatar : womanAvatar}
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
