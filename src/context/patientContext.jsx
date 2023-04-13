import { createContext, useContext } from "react";

export const patientsStateContext = createContext(null);
export const patientsDispatcherContext = createContext(null);

export const usePatients = () => useContext(patientsStateContext);
export const useDispatchPatients = () => useContext(patientsDispatcherContext);
