import AddNote from "../pages/patients-page/pages/details-patient/components/AddNote";
import EditNote from "../pages/patients-page/pages/details-patient/components/EditNote";

const homePagePath = {
  absolutePath: "/",
  relativePath: "/",
  programaticPath: () => "/",
};

const patientsPagePath = {
  absolutePath: "/patients",
  relativePath: "patients",
  programaticPath: () => "/patients",
};

const addPatientPagePath = {
  absolutePath: "/patients/add",
  relativePath: "add",
  programaticPath: () => "/patients/add",
};

const editPatientPagePath = {
  absolutePath: "/patients/edit/:id",
  relativePath: "edit/:id",
  programaticPath: (id) => `/patients/edit/${id}`,
};

const detailsPatientPagePath = {
  absolutePath: "/patients/:id",
  relativePath: ":id",
  programaticPath: (id, mode, noteId) =>
    `/patients/${id}?mode=${mode}&noteId=${noteId || ""}`,
};

const notesPatientPagePath = {
  absolutePath: "/patients/:id/notes",
  relativePath: "notes",
  programaticPath: (id) => `/patients/${id}/notes`,
};

const mode = {
  add: {
    value: "add",
    component: (patientId) => <AddNote patientId={patientId} />,
  },
  edit: {
    value: "edit",
    component: (patientId, noteId) => (
      <EditNote patientId={patientId} noteId={noteId} />
    ),
  },
};

const PathService = {
  homePagePath,
  patientsPagePath,
  addPatientPagePath,
  editPatientPagePath,
  detailsPatientPagePath,
  notesPatientPagePath,
  mode,
};

export default PathService;
