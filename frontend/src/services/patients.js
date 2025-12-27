import api from './api';

export const patientService = {
    // Create Patient
    createPatient: async (patientData) => {
        // patientData: { name, age, gender }
        const response = await api.post('/patients', patientData);
        return response.data; // Expected: { _id, ... }
    },

    // Get All Patients (for ASHA/Clinician)
    getPatients: async () => {
        const response = await api.get('/patients');
        return response.data;
    },

    // Get Patient by ID
    getPatient: async (id) => {
        const response = await api.get(`/patients/${id}`);
        return response.data;
    }
};
