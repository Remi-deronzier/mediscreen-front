import {
  BASE_URL_PATIENTS_SERVICE,
  PAGINATION_SIZE,
  PATIENTS_RESOURCE,
} from "../constants/api";

const getAll = (page) => {
  return fetch(
    `${BASE_URL_PATIENTS_SERVICE}/${PATIENTS_RESOURCE}?page=${
      page - 1
    }&size=${PAGINATION_SIZE}`
  );
};

const get = (id) => {
  return fetch(`${BASE_URL_PATIENTS_SERVICE}/${PATIENTS_RESOURCE}/${id}`);
};

const create = (data) => {
  return fetch(`${BASE_URL_PATIENTS_SERVICE}/${PATIENTS_RESOURCE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const update = (id, data) => {
  return fetch(`${BASE_URL_PATIENTS_SERVICE}/${PATIENTS_RESOURCE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const remove = (id) => {
  return fetch(`${BASE_URL_PATIENTS_SERVICE}/${PATIENTS_RESOURCE}/${id}`, {
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
