import PatientForm from "../layout/PatientForm";

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
      await fetch("http://localhost:8081/patients", {
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
