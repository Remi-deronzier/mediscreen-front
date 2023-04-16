import {
  BASE_URL_NOTES_SERVICE,
  NOTES_RESOURCE,
  PAGINATION_SIZE,
} from "../constants/api";

const getAll = () => {
  return fetch(`${BASE_URL_NOTES_SERVICE}/${NOTES_RESOURCE}`);
};

const get = (id) => {
  return fetch(`${BASE_URL_NOTES_SERVICE}/${NOTES_RESOURCE}/${id}`);
};

const create = (data) => {
  return fetch(`${BASE_URL_NOTES_SERVICE}/${NOTES_RESOURCE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const update = (id, data) => {
  return fetch(`${BASE_URL_NOTES_SERVICE}/${NOTES_RESOURCE}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const remove = (id) => {
  return fetch(`${BASE_URL_NOTES_SERVICE}/${NOTES_RESOURCE}/${id}`, {
    method: "DELETE",
  });
};

const findByPatientId = (id, page) => {
  return fetch(
    `${BASE_URL_NOTES_SERVICE}/${NOTES_RESOURCE}/patient/${id}?page=${
      page - 1
    }&size=${PAGINATION_SIZE}`
  );
};

const NoteService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByPatientId,
};

export default NoteService;
