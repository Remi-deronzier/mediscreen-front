import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "../../../../context/apiContext";
import { usePatients } from "../../../../context/patientContext";
import PatientForm from "../../../layout/PatientForm";

export default function EditPatientPage() {
  const BASE_URL_API = useContext(ApiContext);
  const state = usePatients();
  const { id } = useParams();
  const patient = state.patients.find(
    (patient) => patient.id.toString() === id
  );

  const defaultValues = {
    firstName: patient.firstName,
    lastName: patient.lastName,
    dateOfBirth: patient.dateOfBirth,
    sex: patient.sex,
    phoneNumber: patient.phoneNumber,
    address: patient.address,
  };

  async function submit(payload) {
    try {
      await fetch(`${BASE_URL_API}/patients/${id}`, {
        method: "PUT",
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
