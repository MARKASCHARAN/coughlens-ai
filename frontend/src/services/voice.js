import api from './api';

export const voiceService = {
    sendIntent: async (intent, payload = {}) => {
        const response = await api.post('/voice/intent', {
            intent,
            payload
        });
        return response.data;
    },

    changeLanguage: async (language) => {
        return voiceService.sendIntent('CHANGE_LANGUAGE', { language });
    }
};

export const VoiceIntents = {
    HELP: 'HELP',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    STOP: 'STOP',
    ADD_PATIENT: 'ADD_PATIENT',
    START_COUGH_TEST: 'START_COUGH_TEST',
    GENERATE_REPORT: 'GENERATE_REPORT',
    GET_MY_REPORTS: 'GET_MY_REPORTS',
    SEND_REPORT_WHATSAPP: 'SEND_REPORT_WHATSAPP',
    GET_ANALYTICS_DASHBOARD: 'GET_ANALYTICS_DASHBOARD',
    WHAT_IS_ASTHMA: 'WHAT_IS_ASTHMA',
    WHAT_IS_PNEUMONIA: 'WHAT_IS_PNEUMONIA'
};
