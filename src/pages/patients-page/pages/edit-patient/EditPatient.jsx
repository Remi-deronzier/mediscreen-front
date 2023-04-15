import { useParams } from "react-router-dom";
import Loader from "../../../../components/loader/Loader";
import useFetchPatient from "../../../../hooks/useFetchPatient";
import ErrorPage from "../../../../pages/error-page/ErrorPage";
import PatientForm from "../../../layout/PatientForm";

export default function EditPatientPage() {
  const { id } = useParams();
  const { isLoading, patient, error } = useFetchPatient(id);

  if (error) return <ErrorPage />;

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
