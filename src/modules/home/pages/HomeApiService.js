import { createDigestGetRequest } from "../../../utils/apiservice";

//home apis

export function getWhatsNew(){
    const path = "whatsNew/";
    return createDigestGetRequest(path);
}

export function getRedemptionHistory(){
    const path = "product/redemptionHistory?type=''";
    return createDigestGetRequest(path);
}