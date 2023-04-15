import { DELETE_DATA, SET_DATA } from "../constants/actionTypes";

export default function noteReducer(state, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.data,
      };
    case DELETE_DATA:
      return {
        ...state,
        data: state.data.filter((patient) => patient.id !== action.id),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
