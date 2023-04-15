import { BASE_URL_REPORTS_SERVICE } from "../constants/api";

const downloadPdf = (patientId) => {
  return fetch(
    `${BASE_URL_REPORTS_SERVICE}/reports/pdf?patientId=${patientId}`
  );
};

const ReportService = {
  downloadPdf,
};

export default ReportService;
