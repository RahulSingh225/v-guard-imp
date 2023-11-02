import axios from 'axios';
import digestFetch from 'react-native-digest-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_LINK = 'http://34.100.133.239:18092'; // Replace with your API base URL


const BASE_URL = 'http://34.100.133.239:18092/vguard/api/';

export const createDigestPostRequest = async (relativeUrl = {}, data) => {
    try {
        const url = BASE_URL + relativeUrl;
        const headers = {
            'Content-Type': 'application/json',
        };

        const username = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');

        if (username && password) {
            const response = await digestFetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
                username,
                password,
            });

            return response;
        } else {
            throw new Error('Username and/or password not found in AsyncStorage.');
        }
    } catch (error) {
        throw error;
    }
};

export const createDigestGetRequest = async (relativeUrl = {}) => {
    try {
        const url = BASE_URL + relativeUrl;
        const headers = {
            'Content-Type': 'application/json',
        };

        const username = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');

        if (username && password) {
            const response = await digestFetch(url, {
                method: 'GET',
                headers,
                username,
                password,
            });

            return response;
        } else {
            throw new Error('Username and/or password not found in AsyncStorage.');
        }
    } catch (error) {
        throw error;
    }
};
export const loginPasswordDigest = async (relativeUrl, username, password) => {
    
    try {
        const url = BASE_URL + relativeUrl;
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authType': 'password',
        };
        await AsyncStorage.clear();
        let response = null;
        console.log(response);
        response = await digestFetch(url, {
            method: 'GET',
            headers,
            username,
            password,
        });

        console.log("username=======", username)
        const userDetailsData = await response.json();

        console.log(userDetailsData)

        const { name, userCode } = userDetailsData;
        const userName = username;
        const Password = password;
        const pointsBalance = userDetailsData.pointsSummary.pointsBalance;
        const redeemedPoints = userDetailsData.pointsSummary.redeemedPoints;
        const numberOfScan = userDetailsData.pointsSummary.numberOfScan;

        const safePointsBalance = pointsBalance || 0;
        const safeRedeemedPoints = redeemedPoints || 0;
        const safeNumberOfScan = numberOfScan || 0;

        await AsyncStorage.setItem('username', userName);
        await AsyncStorage.setItem('password', Password);
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('userCode', userCode);
        await AsyncStorage.setItem('pointsBalance', safePointsBalance.toString());
        await AsyncStorage.setItem('redeemedPoints', safeRedeemedPoints.toString());
        await AsyncStorage.setItem('numberOfScan', safeNumberOfScan.toString());

        console.log("usercode=======", await AsyncStorage.getItem('userCode'))
        return response;
    } catch (error) {
        throw error;
    }
};

// export const setUserDetails = async() => {
//         const userDetailsResponse = await fetchUserDetails(username, password);
//         console.log(userDetailsResponse, "<><><<<><>><<")

//         if (userDetailsResponse.status === 200) {
//             const userDetailsData = await userDetailsResponse.json();

//             const { name, userCode } = userDetailsData;
//             const pointsBalance = userDetailsData.pointsSummary.pointsBalance;
//             const redeemedPoints = userDetailsData.pointsSummary.redeemedPoints;
//             const numberOfScan = userDetailsData.pointsSummary.numberOfScan;

//             const safePointsBalance = pointsBalance || 0;
//             const safeRedeemedPoints = redeemedPoints || 0;
//             const safeNumberOfScan = numberOfScan || 0;

//             await AsyncStorage.setItem('name', name);
//             await AsyncStorage.setItem('userCode', userCode);
//             await AsyncStorage.setItem('pointsBalance', safePointsBalance.toString());
//             await AsyncStorage.setItem('redeemedPoints', safeRedeemedPoints.toString());
//             await AsyncStorage.setItem('numberOfScan', safeNumberOfScan.toString());
//           }

//         else {
//             throw new Error('Error fetching user details');
//         }
// }


const fetchUserDetails = () => {
    const path = "user/userDetails"
    return createDigestGetRequest(path);
}

const api = axios.create({
    baseURL: API_LINK,
    headers: {
        'Content-Type': 'application/json',

    },
});

// Example API functions

export const forgotPassword = async (mobileNumber) => {
    try {
        const response = await api.post('/vguard/api/user/forgotPassword', mobileNumber);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

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
        const response = await api.post('/vguard/api/user/validateNewMobileNo', { params: requestBody });
        console.log(response)
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







