import api from './api';

export const authService = {
    requestOtp: async (phone, role) => {
        const response = await api.post('/auth/otp/request', null, {
            params: { phone, role }
        });
        return response.data;
    },

    verifyOtp: async (phone, otp) => {
        const response = await api.post('/auth/otp/verify', null, {
            params: { phone, otp }
        });
        return response.data; // Expected: { access_token, token_type, role }
    }
};
