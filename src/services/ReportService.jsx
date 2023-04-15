import { BASE_URL_REPORTS_SERVICE, REPORTS_RESOURCE } from "../constants/api";

const downloadPdf = (patientId) => {
  return fetch(
    `${BASE_URL_REPORTS_SERVICE}/${REPORTS_RESOURCE}/pdf?patientId=${patientId}`
  );
};

const ReportService = {
  downloadPdf,
};

export default ReportService;
