import { BASE_URL_NOTES_SERVICE } from "../constants/api";

const getAll = () => {
  return fetch(`${BASE_URL_NOTES_SERVICE}/notes`);
};

const get = (id) => {
  return fetch(`${BASE_URL_NOTES_SERVICE}/notes/${id}`);
};

const create = (data) => {
  return fetch(`${BASE_URL_NOTES_SERVICE}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const update = (id, data) => {
  return fetch(`${BASE_URL_NOTES_SERVICE}/notes/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const remove = (id) => {
  return fetch(`${BASE_URL_NOTES_SERVICE}/notes/${id}`, {
    method: "DELETE",
  });
};

const findByPatientId = (id) => {
  return fetch(`${BASE_URL_NOTES_SERVICE}/notes/patient/${id}`);
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
