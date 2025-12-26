import api from './api';

export const audioService = {
    uploadAudio: async (audioBlob) => {
        const formData = new FormData();
        // Appending 'file' as expected by backend. 
        // We name the file 'recording.webm' or 'recording.wav' depending on the blob type, 
        // but the backend contract says .wav | .mp3. 
        // Most browsers record in webm. We will send it and see if backend handles it or we need conversion.
        // For now, let's just append the blob.
        formData.append('file', audioBlob, 'recording.webm');

        const response = await api.post('/audio/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data; // Expected: { audio_id, path }
    }
};
