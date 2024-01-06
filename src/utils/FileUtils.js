import { View, Text } from 'react-native'
import React from 'react'
import { format } from 'date-fns';
import { sendFile } from './apiservice';
import { imageUrl } from './constants';

export async function sendImage(file,documentType,userID){

  try {
      
      const formData = new FormData();
      formData.append('file',{
          uri:file.uri,
          type:file.type,
          name:file.filename
      })
      formData.append('image_related',documentType);
      formData.append('USER_ROLE',userID);
      const result = await sendFile(formData);
      if(result?.status==200){
        return result.data.entityUid
      }
      return "";

  } catch (error) {
    console.log(error);
    return "";
  }
     
}
export function getImages(key,imageType){
  
switch (imageType) {
  case 'PROFILE':
    return `${imageUrl}Profile/${key}`
    break;
    case 'ID_CARD_FRONT':
    return `${imageUrl}IdCard/${key}`
    break;
    case 'ID_CARD_BACK':
    return `${imageUrl}IdCard/${key}`
    break;
    case 'PAN_CARD_FRONT':
      return `${imageUrl}PanCard/${key}`
    break;
    case 'CHEQUE':
    return `${imageUrl}Cheque/${key}`
    break;
    case '':
    
    break;

  default:
    return null;
    break;
}

} 