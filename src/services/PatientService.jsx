import { BASE_URL_PATIENTS_SERVICE } from "../constants/api";

const getAll = () => {
  return fetch(`${BASE_URL_PATIENTS_SERVICE}/patients`);
};

const get = (id) => {
  return fetch(`${BASE_URL_PATIENTS_SERVICE}/patients/${id}`);
};

const create = (data) => {
  return fetch(`${BASE_URL_PATIENTS_SERVICE}/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const update = (id, data) => {
  return fetch(`${BASE_URL_PATIENTS_SERVICE}/patients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const remove = (id) => {
  return fetch(`${BASE_URL_PATIENTS_SERVICE}/patients/${id}`, {
    method: "DELETE",
  });
};

const PatientService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default PatientService;
