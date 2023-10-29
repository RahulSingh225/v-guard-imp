import axios from 'axios';

const API_LINK = 'http://34.100.133.239:18092'; // Replace with your API base URL

// Create an instance of Axios with default configuration
const api = axios.create({
    baseURL: API_LINK,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to set the authentication token
export const setAuthToken = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Function to clear the authentication token
export const clearAuthToken = () => {
    delete api.defaults.headers.common['Authorization'];
};

// Example API functions


export const postUserData = async (userData) => {
    try {
        const response = await api.post('/user', userData);
        return response.data;
    } catch (error) {
        console.error('Error posting user data:', error);
        throw error;
    }
};

export const fetchSomeOtherData = async () => {
    try {
        const response = await api.get('/some-other-endpoint');
        return response.data;
    } catch (error) {
        console.error('Error fetching other data:', error);
        throw error;
    }
};
export const fetchPinCodeData = async (pincode) => {
    console.log('Fetching data for pincode:===%%%%', typeof pincode);
    try {
        const response = await api.get(`/vguard/api/state/pinCodeList/${pincode}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pin code data:', error);
        throw error;
    }
};
export const PincodedetailList = async (pincodeid) => {
    console.log('Fetching data for pincode:===%%%%', pincodeid);
    try {
        const response = await api.get(`/vguard/api/state/detailByPincode/${pincodeid}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pin code data:', error);
        throw error;
    }
};

export const GetProfession = async () => {
    console.log('Fetching data for profession:===%%%%',);
    try {
        const response = await api.get(`/vguard/api/user/getProfession/${0}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pin code data:', error);
        throw error;
    }
};


export const Getallbanks = async () => {
    console.log('Fetching data for banks:===%%%%',);
    try {
        const response = await api.get(`/vguard/api/banks/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pin code data:', error);
        throw error;
    }
};
export const NewusermobileNumberValidation = async (mobileNo, preferredLanguagePos) => {
    try {
        const requestBody = {
            mobileNo: mobileNo,
            preferredLanguagePos: preferredLanguagePos
        };

        const response = await api.post('/vguard/api/user/validateNewMobileNo', { mobileNo: mobileNo, preferredLanguagePos: preferredLanguagePos });
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
export const Newuserotpvalidation = async (mobileNo, otp) => {
    try {
        const requestBody = {
            mobileNo: mobileNo,
            otp: otp,
        };
        console.log({ mobileNo, otp });
        const response = await api.post('/vguard/api/user/validateNewUserOtp', { mobileNo: mobileNo, otp: otp });
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const Citylist = async (disctrictId) => {
    console.log('Fetching data for pincode:===%%%%', disctrictId);
    try {
        const response = await api.get(`/vguard/api/city/${disctrictId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pin code data:', error);
        throw error;
    }
};





