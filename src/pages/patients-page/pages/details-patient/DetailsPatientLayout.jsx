import { useReducer } from "react";
import { Outlet } from "react-router-dom";

import {
  notesDispatcherContext,
  notesStateContext,
} from "../../../../context/noteContext";
import noteReducer from "../../../../reducers/noteReducer";

export default function DetailsPatientLayout() {
  const [notes, dispatch] = useReducer(noteReducer, { data: [] });

  return (
    <notesStateContext.Provider value={notes}>
      <notesDispatcherContext.Provider value={dispatch}>
        <Outlet />
      </notesDispatcherContext.Provider>
    </notesStateContext.Provider>
  );
}
