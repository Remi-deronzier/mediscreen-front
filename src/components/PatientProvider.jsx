import { useReducer } from "react";
import {
  patientsDispatcherContext,
  patientsStateContext,
} from "../context/patientContext";
import patientReducer from "../reducers/patientReducer";

export default function PatientProvider({ children }) {
  const [patients, dispatch] = useReducer(patientReducer, { patients: [] });

  return (
    <patientsStateContext.Provider value={patients}>
      <patientsDispatcherContext.Provider value={dispatch}>
        {children}
      </patientsDispatcherContext.Provider>
    </patientsStateContext.Provider>
  );
}
