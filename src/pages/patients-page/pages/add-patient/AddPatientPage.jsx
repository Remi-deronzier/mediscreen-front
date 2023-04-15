import PatientService from "../../../../services/PatientService";
import PatientForm from "../../../layout/PatientForm";

export default function AddPatientPage() {
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
      await PatientService.create(payload);
    } catch (error) {
      throw new Error(error);
    }
  }

  return <PatientForm defaultValues={defaultValues} submit={submit} />;
}
