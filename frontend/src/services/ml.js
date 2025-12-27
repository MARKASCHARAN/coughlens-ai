import api from './api';

export const mlService = {
    inferCough: async (patientId, audioPath) => {
        const params = { audio_path: audioPath };
        if (patientId) params.patient_id = patientId;

        const response = await api.post('/ml/infer', null, { params });
        return response.data; // Expected: { prediction, confidence, report_id }
    }
};
