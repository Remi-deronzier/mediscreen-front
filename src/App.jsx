import PatientFeature from "./components/PatientFeature";
import PatientProvider from "./components/PatientProvider";

export default function App() {
  return (
    <PatientProvider>
      <PatientFeature />
    </PatientProvider>
  );
}
