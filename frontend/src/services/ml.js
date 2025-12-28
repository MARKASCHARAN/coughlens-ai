import api from './api';

export const mlService = {
    inferCough: async (patientId, audioPath) => {
        const params = { audio_path: audioPath };
        if (patientId) params.patient_id = patientId;

        const response = await api.post('/ml/infer', null, { params });
        return response.data; // Expected: { prediction, confidence, report_id }
    },

    // 🆕 DIRECT INFERENCE (Blob -> Result)
    inferCoughDirect: async (audioBlob, patientId) => {
        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");
        if (patientId) {
            formData.append("patient_id", patientId);
        }

        const response = await api.post('/ml/infer/direct', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    }
};
