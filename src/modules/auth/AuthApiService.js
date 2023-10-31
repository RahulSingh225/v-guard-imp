import { createDigestGetRequest } from "../../utils/apiservice";

export function loginWithPassword(username, password){
    const path = "user/userDetails/login";
    return createDigestGetRequest(path, username, password);
}