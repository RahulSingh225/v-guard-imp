import { createDigestGetRequest, loginPasswordDigest } from "../../utils/apiservice";
import { createDigestPostRequest } from "../../utils/apiservice";

export function loginWithPassword(username, password) {
    const path = "user/userDetails/login";
    console.log("<><><><", username)
    return loginPasswordDigest(path, username, password);
}

export function sendloginWithOtp(number) {
    const body = {
        loginOtpUserName: number,
        otpType: "SMS"
    };
    const path = "user/generateOtpForLogin"
    return createDigestPostRequest(path, body)
}

export function validateLoginOtp(number, otp) {
    const body = {
        loginOtpUserName: number,
        otp: otp
    }
    const path = "user/validateLoginOtp"
    return createDigestPostRequest(path, body)
}

