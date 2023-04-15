import { createContext } from "react";
import {
  BASE_URL_NOTES_SERVICE,
  BASE_URL_PATIENTS_SERVICE,
  BASE_URL_REPORTS_SERVICE,
} from "../constants/api";

export const ApiContext = createContext({});

export const baseUrlServices = {
  BASE_URL_PATIENTS_SERVICE,
  BASE_URL_REPORTS_SERVICE,
  BASE_URL_NOTES_SERVICE,
};
