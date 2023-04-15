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
  programaticPath: (id) => `/patients/${id}`,
};

const notesPatientPagePath = {
  absolutePath: "/patients/:id/notes",
  relativePath: "notes",
  programaticPath: (id) => `/patients/${id}/notes`,
};

const PathService = {
  homePagePath,
  patientsPagePath,
  addPatientPagePath,
  editPatientPagePath,
  detailsPatientPagePath,
  notesPatientPagePath,
};

export default PathService;
