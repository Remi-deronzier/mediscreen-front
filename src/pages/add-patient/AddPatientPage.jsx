import { useContext } from "react";
import { ApiContext } from "../../context/apiContext";
import PatientForm from "../layout/PatientForm";

export default function AddPatientPage() {
  const BASE_URL_API = useContext(ApiContext);

  const defaultValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    sex: "",
    phoneNumber: "",
    address: "",
  };

  async function submit(payload) {
    try {
      await fetch(`${BASE_URL_API}/patients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  return <PatientForm defaultValues={defaultValues} submit={submit} />;
}
