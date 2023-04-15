import { createContext } from "react";

export const ApiContext = createContext({});

export const baseUrlServices = {
  BASE_URL_PATIENTS_SERVICE: "http://localhost:8081",
  BASE_URL_REPORTS_SERVICE: "http://localhost:8080",
  BASE_URL_NOTES_SERVICE: "http://localhost:8082",
};
