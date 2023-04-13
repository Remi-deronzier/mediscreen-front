import { DELETE_PATIENT, SET_PATIENTS } from "../constants/actionTypes";

export default function patientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PATIENTS:
      return {
        ...state,
        patients: action.patients,
      };
    case DELETE_PATIENT:
      return {
        ...state,
        patients: state.patients.filter((patient) => patient.id !== action.id),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
