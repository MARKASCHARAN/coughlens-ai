import api from './api';

export const reportsService = {
    generateReport: async (patientId) => {
        const response = await api.post('/reports/generate', null, {
            params: { patient_id: patientId }
        });
        return response.data;
    },

    getPatientReports: async (patientId) => {
        const response = await api.get(`/reports/patient/${patientId}`);
        return response.data;
    },

    shareReportWhatsApp: async (reportId, phone) => {
        const response = await api.post('/reports/share/whatsapp', null, {
            params: { report_id: reportId, phone }
        });
        return response.data;
    }
};
