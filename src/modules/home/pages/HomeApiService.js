import { createDigestGetRequest } from "../../../utils/apiservice";

//home apis

export function getWhatsNew(){
    const path = "whatsNew/";
    return createDigestGetRequest(path);
}