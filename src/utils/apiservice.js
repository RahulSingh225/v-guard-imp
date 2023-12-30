import axios from 'axios';
import digestFetch from 'react-native-digest-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from "@react-native-firebase/messaging";

const API_LINK = 'http://34.100.133.239:18092';

const imageURL = 'https://vguardrishta.com/';

const BASE_URL = 'http://34.100.133.239:18092/vguard/api/';

export const createDigestPostRequest = async (relativeUrl = {}, data) => {
  try {
    const url = BASE_URL + relativeUrl;
   
    const username = await AsyncStorage.getItem('username');
    const password = await AsyncStorage.getItem('password');
    const authType = await AsyncStorage.getItem('authType');


    const headers = {
      'Content-Type': 'application/json',
      'authType':authType
    };


    if (username && password) {
      const response = await digestFetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
        username,
        password,
      })

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
   

    const username = await AsyncStorage.getItem('username');
    const password = await AsyncStorage.getItem('password');
    const authType = await AsyncStorage.getItem('authType');

     const headers = {
      'Content-Type': 'application/json',
      'authType':authType
    };

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

const update_fcm_token = async () => {
    const path = 'pushNotification/registerToken'
    try {
      let fcmtoken = await messaging().getToken();
      if(fcmtoken){
        let body = {
          fcmToken : fcmtoken
        }
        await createDigestPostRequest(path,body)
      }else{
        console.log("Error : Issue in firebase FCM generater, ",fcmtoken)
      }
    } catch (e) {
      console.log("Error : ", e);
    }
};

export const loginPasswordDigest = async (relativeUrl, username, password) => {
  try {
    const authType = await AsyncStorage.getItem('authType');
    const url = BASE_URL + relativeUrl;
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authType: authType,
    };
    await AsyncStorage.clear();
    let response = null;
    response = await digestFetch(url, {
      method: 'GET',
      headers,
      username,
      password,
    });
    const userName = username;
    const Password = password;
    if(response?.status === 200){
      await AsyncStorage.setItem('username', userName);
      await AsyncStorage.setItem('password', Password);
      await update_fcm_token();
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const api = axios.create({
  baseURL: API_LINK,
});
const imageApi = axios.create({
  baseURL: imageURL,
});
const imageApi2 = axios.create({
  baseURL: imageURL,
});

// Example API functions

export const forgotPassword = async mobileNumber => {
  try {
    console.log("Mobile Number--------", mobileNumber)
    const response = await api.post(
      '/vguard/api/user/forgotPassword',
      mobileNumber,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchImage = async relativeUrl => {
  try {
    const response = await imageApi.get(relativeUrl);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postUserData = async userData => {
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
export const fetchPinCodeData = async pincode => {
  console.log('Fetching data for pincode:===%%%%', typeof pincode);
  try {
    const response = await api.get(`/vguard/api/state/pinCodeList/${pincode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pin code data:', error);
    throw error;
  }
};
export const PincodedetailList = async pincodeid => {
  console.log('Fetching data for pincode:===%%%%', pincodeid);
  try {
    const response = await api.get(
      `/vguard/api/state/detailByPincode/${pincodeid}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching pin code data:', error);
    throw error;
  }
};

export const GetProfession = async () => {
  console.log('Fetching data for profession:===%%%%');
  try {
    const response = await api.get(`/vguard/api/user/getProfession/${0}`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching pin code data:', error);
    throw error;
  }
};

export const Getsubprofession = async () => {
  console.log('Fetching data for subprofession:===%%%%');
  try {
    const response = await api.get(`/vguard/api/user/getSubProfession/${0}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pin code data:', error);
    throw error;
  }
};

export const Getallbanks = async () => {
  console.log('Fetching data for banks:===%%%%');
  try {
    const response = await api.get('/vguard/api/banks/');
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching pin code data:', error);
    throw error;
  }
};
export const NewusermobileNumberValidation = async (
  mobileNo,
  preferredLanguagePos,
) => {
  try {
    const requestBody = {
      mobileNo: mobileNo,
      preferredLanguagePos: preferredLanguagePos,
    };

    const response = await api.post('/vguard/api/user/validateNewMobileNo', {
      mobileNo: mobileNo,
      preferredLanguagePos: preferredLanguagePos,
    });
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
    console.log({mobileNo, otp});
    const response = await api.post('/vguard/api/user/validateNewUserOtp', {
      mobileNo: mobileNo,
      otp: otp,
    });

    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const Citylist = async disctrictId => {
  console.log('Fetching data for pincode:===%%%%', disctrictId);
  try {
    const response = await api.get(`/vguard/api/city/${disctrictId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pin code data:', error);
    throw error;
  }
};

export const RegisterNewUser = async userbody => {
  try {
    const response = await api.post('/vguard/api/user/registerUser', userbody);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
};

export const sendFile = async formData => {
  try {
    //  console.log("INDE API SERVICE SEND FILE CJECLING FORM DATA ", formData);
    const response = await api.post('/vguard/api/file', formData);
    return response;
  } catch (error) {
    if (error && error.response?.data) {
      console.log('asdadsa', error.response.data);
    }
    console.error('Error sending file:', error);
    throw error;
  }
};
export const sendFileAfterLogin = async formData1 => {
  try {
    const response = await api.post('/vguard/api/file', formData1);
    return response;
  } catch (error) {
    if (error && error.response?.data) {
      console.log('asdadsa', error.response.data);
    }
    console.error('Error sending file:', error);
    throw error;
  }
};

export const Appversion = async () => {
  try {
    const response = await api.get('/vguard/api/user/version');
    return response;
  } catch (error) {
    throw error;
  }
};

export function getUserProfile() {
  const path = 'user/profile';
  return createDigestGetRequest(path);
}

export function captureSale(data) {
  const path = 'coupon/process';
  return createDigestPostRequest(path, data);
}
export function sendCouponPin(data) {
  const path = 'coupon/processForPin';
  return createDigestPostRequest(path, data);
}

export function getScanPopUp(data) {
  const path = 'user/scanPopUp/{id}';
  return createDigestPostRequest(path, data);
}

export function getFile(uuid, imageRelated, userRole) {
  const path = `file/${uuid}/${imageRelated}/${userRole}`;
  console.log(path);
  return createDigestGetRequest(path);
}

export function getBonusPoints(transactionId) {
  const path = `coupon/getBonusPoint/${transactionId}`;
  return createDigestGetRequest(path);
}

export function getNotifications() {
  const path = 'alert/';
  return createDigestGetRequest(path);
}
export function getNotificationCount() {
  const path = 'alert/count';
  return createDigestGetRequest(path);
}
export function getKycIdTypes() {
  const path = 'user/kycIdTypes';
  return createDigestGetRequest(path);
}


// export const sendFile = async (formData) => {
//     try {

//         const response = await api.post(`/vguard/api/file`, formData);
//         return response;
//     } catch (error) {
//         console.error('Error sending file:', error);
//         throw error;
//     }
// };

// export const Appversion = async () => {
//     try {
//         const response = await api.get(`/vguard/api/user/version`);
//         return response;
//     } catch (error) {
//         throw error;

//     }
// };

export const Profile = async () => {
  try {
    const response = await api.get('/vguard/api/user/profile');
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const reupdatekyc = async data => {
  try {
    const relativeUrl = 'user/updateKyc';
    console.log('<***********>', data);
    const response = await createDigestPostRequest(relativeUrl, data);

    if (response.ok) {
      const responseData = await response.json(); // Assuming the response body is in JSON format
      return responseData;
    } else {
      console.error('Error updating KYC:', response.statusText);
      throw new Error('Failed to update KYC');
    }
  } catch (error) {
    console.error('Error updating KYC:', error);
    throw error;
  }
};

// export function getUserProfile() {
//     const path = "user/profile";
//     return createDigestGetRequest(path);
// }
// export function getFile(uuid, imageRelated, userRole) {
//     const path = `file/${uuid}/${imageRelated}/${userRole}`;
//     console.log(path)
//     return createDigestGetRequest(path);
// }

export const sendFileWithDigestAuth = async formData => {
  try {
    const relativeUrl = 'file'; // Replace with the actual relative URL
    const response = await createDigestPostRequest(relativeUrl, formData);

    return response;
  } catch (error) {
    console.error('Error sending file with digest auth:', error);
    throw error;
  }
};

export const UpdateUserProfile = async profilebody => {
  try {
    const relativeUrl = 'user/updateProfile';
    const resposne = await createDigestPostRequest(relativeUrl, profilebody);
    if (resposne.ok) {
      return await resposne.json();
    } else {
      throw new Error(`Request failed with status ${resposne.status}`);
    }
  } catch (error) {
    console.error('Error sending file with profile', error);
    throw error;
  }
};

export const loginwithotpApi = async userCredentials => {
  try {
    const relativeUrl = 'user/validateLoginOtp';
    const response = await createDigestPostRequest(
      relativeUrl,
      userCredentials,
    );
    return response.json();
  } catch (error) {
    console.error('Error validating login OTP', error);
    throw error;
  }
};

export const otpviacall = async userCredentials => {
  try {
    const relativeUrl = 'user/generateOtpForLogin';
    const response = await createDigestPostRequest(
      relativeUrl,
      userCredentials,
    );
    return response.json();
  } catch (error) {
    console.error('Error validating login OTP', error);
    throw error;
  }
};

export const generateOtpViaCall = async body => {
  try {
    const relativeUrl = `${BASE_URL}user/validateNewMobileNo`;
    const response = await api.post(relativeUrl,body)
    return response;
  } catch (error) {
    console.error('Error while getting OTP via call', error);
  }
};

export const generateOtpForLogin = async number => {
  try {
    const relativeUrl = `${BASE_URL}user/generateOtpForLogin`;
    const response = await api.post(relativeUrl,{loginOtpUserName:number,otpType:null})
    return response;
  } catch (error) {
    console.error('Error validating login OTP', error);
  }
};

export const validateOtpLogin = async (userDetails,headers=null) => {
  try {
    const relativeUrl = `${BASE_URL}user/validateLoginOtp`;
    const response = await api.post(relativeUrl,userDetails)
    if(response.status === 200){
      await AsyncStorage.setItem("username", String(userDetails.loginOtpUserName))
      await AsyncStorage.setItem("password", String(userDetails.otp))
      await AsyncStorage.setItem("authType", "otp")
      await update_fcm_token()
    }
    return response;
  } catch (error) {
    console.error('Error validating login OTP', error);
    console.log(">>>>error",error)
    throw error;
  }
};


export function getSchemeImages() {
  const path = 'schemes/';
  return createDigestGetRequest(path);
}
export function getInfoDeskBanners() {
    const path = 'infoDesk/banners';
    return createDigestGetRequest(path);
  }

  export function checkScanPopUp(id) {
    const path = `user/scanPopUp/${id}`;
    return createDigestGetRequest(path);
  }
  export const generateOtpForReverify = async userbody => {
    try {
      console.log('==============INSIDE aPI SERVIE ======================');
      console.log(userbody);
      console.log('====================================');
      const response = await api.post('/vguard/api/user/generateOtpForReverify', userbody);
      return response.data;
    } catch (error) {
      console.error('Error ', error);
      throw error;
    }
  };

  export const validateReverifyOtp = async userbody => {
    try {
      console.log('==============INSIDE aPI SERVIE ======================');
      console.log(userbody);
      console.log('====================================');
      const response = await api.post('/vguard/api/user/validateReverifyOtp', userbody);
      return response.data;
    } catch (error) {
      console.error('Error ', error);
      throw error;
    }
  };

  export function getUser() {
    const path = `user/userDetails`;
    return createDigestGetRequest(path);
  }


  export function getBankDetail() {
    const path = `user/bankDetails`;
    return createDigestGetRequest(path);
  }

  
export const reUpdateUserForKyc = async userCredentials => {
  try {
    const relativeUrl = 'user/reUpdateUserForKyc';
    const response = await createDigestPostRequest(
      relativeUrl,
      userCredentials,
    );
    return response.json();
  } catch (error) {
    console.error('Error validating login OTP', error);
    throw error;
  }
};

export const processErrorCoupon = async userCredentials => {
  try {
    const relativeUrl = 'coupon/processErrorCoupon';
    const response = await createDigestPostRequest(
      relativeUrl,
      userCredentials,
    );
    return response.json();
  } catch (error) {
    console.error('Error validating login OTP', error);
    throw error;
  }
};

export function bankTransfer(data) {
  const path = 'order/bankTransfer';
  return createDigestPostRequest(path, data);
}
