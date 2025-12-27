import api from './api';

export const authService = {
    // Step 1: Request OTP (Email)
    requestOtp: async (email, role) => {
        const response = await api.post('/auth/email/request', null, {
            params: { email, role }
        });
        return response.data;
    },

    // Step 2: Verify OTP
    verifyOtp: async (email, otp) => {
        const response = await api.post('/auth/email/verify', null, {
            params: { email, otp }
        });
        return response.data; // Expected: { access_token, role }
    },

    // Step 3: Complete Profile
    completeProfile: async (profileData) => {
        const response = await api.post('/auth/profile/complete', profileData);
        return response.data;
    },

    // Get Current Profile
    getProfile: async () => {
        const response = await api.get('/auth/profile/me');
        return response.data;
    },

    // Update Profile
    updateProfile: async (updates) => {
        const response = await api.patch('/auth/profile/update', updates);
        return response.data;
    }
};
