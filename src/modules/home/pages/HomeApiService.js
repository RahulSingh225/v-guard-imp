import { createDigestGetRequest, createDigestPostRequest, fetchImage } from "../../../utils/apiservice";

//home apis

export function getWhatsNew(){
    const path = "whatsNew/";
    return createDigestGetRequest(path);
}

export function getRedemptionHistory(){
    const path = "product/redemptionHistory?type=''";
    return createDigestGetRequest(path);
}

export function getActiveSchemesOffers(){
    const path = "schemes/getActiveSchemeOffers";
    return createDigestGetRequest(path);
}

export function fetchInfo(){
    const path = "product/getVguardInfoDownloads";
    return createDigestGetRequest(path);
}

export function fetchDownloads(){
    const path = "product/getDownloadsData";
    return createDigestGetRequest(path);
}

export function fetchProductCatalogue(){
    const path = "product/getVguardProdCatalog";
    return createDigestGetRequest(path);
}

export function fetchTicketHistory(){
    const path = "ticket/history";
    return createDigestGetRequest(path);
}

export function fetchTicketOptions(){
    const path = "ticket/types";
    return createDigestGetRequest(path);
}

export function fetchWelfare(){
    const path = "welfare/";
    return createDigestGetRequest(path);
}

export function fetchProductWiseEarning(){
    const path = "product/getProductWiseEarning";
    return createDigestGetRequest(path);
}

export function fetchSchemeWiseEarning(){
    const path = "schemes/getSchemeWiseEarning";
    return createDigestGetRequest(path);
}

export function fetchBonusRewards(){
    const path = "user/bonusPoints";
    return createDigestGetRequest(path);
}

export function getDailyWinnerDates(){
    const path = "user/getDailyWinnerDates/";
    return createDigestGetRequest(path);
}

export function getDailyWinners(date){
    const path = "user/dailyWinners";
    const body = {date}
    return createDigestPostRequest(path, body);
}



