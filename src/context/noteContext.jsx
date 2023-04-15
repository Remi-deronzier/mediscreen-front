import { createContext, useContext } from "react";

export const notesStateContext = createContext(null);
export const notesDispatcherContext = createContext(null);

export const useNotes = () => useContext(notesStateContext);
export const useDispatchNotes = () => useContext(notesDispatcherContext);
