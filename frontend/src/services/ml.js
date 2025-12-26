import api from './api';

export const mlService = {
    inferCough: async (patientId, audioPath) => {
        const response = await api.post('/ml/infer', null, {
            params: { patient_id: patientId, audio_path: audioPath }
        });
        return response.data; // Expected: { prediction, confidence, report_id }
    }
};
