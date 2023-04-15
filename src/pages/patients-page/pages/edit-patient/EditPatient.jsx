import { useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/loader/Loader";
import { ApiContext } from "../../../../context/apiContext";
import useFetchPatient from "../../../../hooks/useFetchPatient";
import ErrorPage from "../../../../pages/error-page/ErrorPage";
import PatientForm from "../../../layout/PatientForm";

export default function EditPatientPage() {
  const { id } = useParams();
  const { isLoading, patient, error } = useFetchPatient(id);
  const { BASE_URL_PATIENTS_SERVICE } = useContext(ApiContext);

  if (error) return <ErrorPage />;

  const defaultValues = {
    firstName: patient.firstName,
    lastName: patient.lastName,
    dateOfBirth: patient.dateOfBirth,
    sex: patient.sex,
    address: patient.address,
    phoneNumber: patient.phoneNumber,
  };

  async function submit(payload) {
    try {
      if (JSON.stringify(defaultValues) === JSON.stringify(payload))
        throw new Error("No changes detected, please update the form");
      await fetch(`${BASE_URL_PATIENTS_SERVICE}/patients/${id}`, {
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

  return isLoading ? (
    <Loader />
  ) : (
    <PatientForm defaultValues={defaultValues} submit={submit} />
  );
}
