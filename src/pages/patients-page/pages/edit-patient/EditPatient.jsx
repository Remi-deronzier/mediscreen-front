import { useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/loader/Loader";
import { ApiContext } from "../../../../context/apiContext";
import useFetchPatient from "../../../../hooks/useFetchPatient";
import PatientForm from "../../../layout/PatientForm";

export default function EditPatientPage() {
  const { BASE_URL_PATIENTS_SERVICE: BASE_URL_API } = useContext(ApiContext);

  const { id } = useParams();
  const { isLoading, patient } = useFetchPatient(
    `${BASE_URL_API}/patients/${id}`
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

  return isLoading ? (
    <Loader />
  ) : (
    <PatientForm defaultValues={defaultValues} submit={submit} />
  );
}
